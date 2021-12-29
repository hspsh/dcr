import { Request, Response } from 'express'
import fetchEntry from './fetchEntry'
import { Knex } from 'knex'

export default async (req:Request, res:Response, pg:Knex, timeLogID:string) => {
  let entry = await fetchEntry(req.params.name, pg)
    .catch(err => {; throw err})
  let newEntry = false

  if (entry.name === '') {
    let addEntry = async () => {
      await pg('graphs').insert({
        'input': `./bucket/${req.params.name}`,
        'output': `./bucket/${req.params.name}`,
        'name': req.params.name,
        'outputUpdated': false
      }).then((item:object) => {
        console.timeLog(timeLogID)
        console.info(`NEW ITEM: \"${req.params.name}\"`)
      }).catch((err:Error) => {throw err})
    }

    await addEntry()
      .catch(err => {throw err})

    entry = await fetchEntry(req.params.name, pg)
      .catch(err => {throw err})
    newEntry = true
  }

  return {...entry, newEntry: newEntry};
}