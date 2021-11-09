import { Request, Response } from 'express'
import crypto from 'crypto' //btc ftw
import fetchEntry from './fetchEntry'
import { Knex } from 'knex'

export default async (req:Request, res:Response, pg:Knex) => {
  const id = "fetchText " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  let entry = await fetchEntry(req.params.name, pg)
    .catch(err => {console.timeEnd(id); throw err})
  let newEntry = false

  if (entry.name === '') {
    let addEntry = async () => {
      await pg('graphs').insert({
        'input': `./bucket/${req.params.name}`,
        'output': `./bucket/${req.params.name}`,
        'name': req.params.name,
        'outputUpdated': false
      }).then((item:object) => {
        console.timeLog(id)
        console.info(`NEW ITEM: \"${req.params.name}\"`)
      }).catch((err:Error) => {console.timeEnd(id); throw err})
    }

    await addEntry()
      .catch(err => {console.timeEnd(id); throw err})

    entry = await fetchEntry(req.params.name, pg)
      .catch(err => {console.timeEnd(id); throw err})
    newEntry = true
  }

  console.timeEnd(id)
  return {...entry, newEntry: newEntry};
}