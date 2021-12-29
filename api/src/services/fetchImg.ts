import { Request, Response } from 'express'
import util from 'util'
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
  let entry = await fetchEntry(req.params.name, pg)
    .catch((err:Error) => {throw err})
  let files = new filesClass(entry.input, entry.output)
  let exists = false

  if (entry.name === '') {
    console.info(`ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return {file: '', updated: false, exists}
  } else {
    exists = true
  }
  if (entry.outputUpdated === true) {
    return {file: entry.output, updated: false, exists}
  } else {
    const asyncExec = util.promisify(exec)
    const renderImage = async () => {
      try {
        const { stdout, stderr } = await asyncExec(`dot -Tpng ${files.input} -o ${files.output}`)
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          throw stderr
        } else {
          try {
            //Place information, in database, that this entry is already rendered
            await pg('graphs').where({name: req.params.name}).update({outputUpdated: true},   ["name", "outputUpdated"])
            console.info("IMAGE UPDATED")
            return {file: entry.output, updated: true, exists}
          } catch (err) {
            throw err
          }
        }
      } catch (err) {
        console.error(err)
        throw err
      }
    }
    return renderImage()
      .then(item => item)
      .catch(err => {throw {err, response: {file: entry.output, updated: false, exists}}})
  }
}