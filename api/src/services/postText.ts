import { Request, Response } from 'express'
import crypto from 'crypto'
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
  const id = "postText " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  let entry = await fetchEntry(req.params.name, pg)
    .catch(err => {console.timeEnd(id); throw err})
  let files = new filesClass(entry.input, entry.output)
  let exists = false

  if (entry.name === '') {
    console.timeEnd(id)
    console.info(`ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return {status: "Does not exist!", exists}
  } else {
    exists = true
  }

  return await fs.writeFile(files.input, req.body.content)
    .then(async () => {
      await pg('graphs').where({name: req.params.name}).update({outputUpdated: false}, ["name", "outputUpdated"])
        .catch((err:Error) => {console.timeEnd(id); throw err})
    })
    .then(item => {
      console.timeEnd(id)
      return ({status: "Everything guitar'a bq!", exists})
    })
    .catch(err => {console.timeEnd(id); throw err})
}