import { Request, Response } from 'express'
import { spawn } from 'child_process'
import { Knex } from 'knex'
import graphRepository from './GraphRepository'

interface fetchImg {
  content: string;
  updated: boolean;
  exists: boolean;
}

export default async (req: Request, res: Response, pg: Knex, timeLogID: string): Promise<fetchImg> => {
  let entry = await graphRepository.findByName(req.params.name) 
  let exists = true

  if (!entry) {
    exists = false
    console.info(`${timeLogID} ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return { content: '', updated: false, exists }
  } else if (entry.outputUpdated === true) {
    return { content: entry.img, updated: false, exists }
  } else {
    const renderImage = (): Promise<fetchImg> => {
      return new Promise((resolve, reject) => {
        const dot = spawn('dot', ['-Tsvg'])
        let response = { content: '', updated: false, exists }

        // Write entry.text to the stdin of dot process
        dot.stdin.write(entry.text)
        dot.stdin.end()

        dot.stdout.on('data', (data: Buffer) => {
          try {
            response = { content: data.toString(), updated: true, exists }
            // Add rendered image to database
            // God fuck please make this code use the fucking repository update or smthing XDD
            pg('graphs').where({ name: req.params.name }).update({ outputUpdated: true, img: data.toString() }, ["name", "outputUpdated", "img"]).then(() => {
              console.info(`${timeLogID} UPDATED IMAGE UPLOADED TO DATABASE`)
            })
          } catch (err) {
            throw err
          }
        })
        dot.stderr.on('data', (data: Buffer) => {
          console.error(`${timeLogID} stderr: ${data.toString()}`)
          reject(data.toString())
        })
        dot.once('exit', (code: number, signal: string) => {
          if (code === 0) {
            resolve(response)
          } else {
            reject(new Error('Exit with error code: ' + code));
          }
        });
        dot.once('error', (err: Error) => {
          reject(err)
        })
      })
    }

    return await renderImage().catch(err => { throw err })
  }
}
