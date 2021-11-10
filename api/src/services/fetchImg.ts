import { Request, Response } from 'express'
import util from 'util'
import crypto from 'crypto'
import fetchEntry from './fetchEntry'
import path from 'path'
import { exec, ExecException } from 'child_process'
import { Knex } from 'knex'

class filesClass {
  input: string
  output: string

  constructor(input:string, output:string) {
    this.input = path.join(__dirname, "../../public", `${input}.gz`)
    this.output = path.join(__dirname, "../../public", `${output}.png`)
  }
}

export default async (req:Request, res:Response, pg:Knex) => {
  const id = "fetchImg " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  let entry = await fetchEntry(req.params.name, pg)
    .catch((err:Error) => {console.timeEnd(id); throw err})
  let files = new filesClass(entry.input, entry.output)
  let exists = false

  if (entry.name === '') {
    console.timeEnd(id)
    console.info(`ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return {file: '', updated: false, exists}
  } else {
    exists = true
  }
  if (entry.outputUpdated === true) {
    console.timeEnd(id)
    return {file: entry.output, updated: false, exists}
  } else {
    const asyncExec = util.promisify(exec)
    const renderImage = async () => {
      try {
        const { stdout, stderr } = await asyncExec(`dot -Tpng ${files.input} -o ${files.output}`)
        if (stderr) {
          console.timeEnd(id)
          console.error(`stderr: ${stderr}`)
          throw stderr
        } else {
          try {
            //In database, place information that this entry is already rendered
            await pg('graphs').where({name: req.params.name}).update({outputUpdated: true},   ["name", "outputUpdated"])
            console.timeEnd(id)
            console.info("IMAGE UPDATED")
            return {file: entry.output, updated: true, exists}
          } catch (err) {
            console.timeEnd(id)
            throw err
          }
        }
      } catch (err) {
        console.timeEnd(id)
        console.error(err)
        throw err
      }
    }
    return renderImage()
      .then(item => item)
      .catch(err => {throw {err, response: {file: entry.output, updated: false, exists}}})
  }
}