import { Request, Response } from 'express'
import fetchEntry from './fetchEntry'
import { Knex } from 'knex'
import path from 'path'
import * as fs from 'fs/promises'

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
    .catch(err => { throw err})
  let files = new filesClass(entry.input, entry.output)
  let exists = false

  if (entry.name === '') {
    console.info(`ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return {status: "Does not exist!", exists}
  } else {
    exists = true
  }

  return await fs.writeFile(files.input, req.body.content)
    .then(async () => {
      await pg('graphs').where({name: req.params.name}).update({outputUpdated: false}, ["name", "outputUpdated"])
        .catch(err => { throw err })
    })
    .then(() => ({status: "Updated!", exists}))
    .catch(err => {console.error(err); return ({status: "Error while editing file!", exists})})
}