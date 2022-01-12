import { Request, Response } from 'express'
import { fetchEntryText } from './fetchEntry'
import { Knex } from 'knex'

export default async (req:Request, res:Response, pg:Knex, timeLogID:string) => {
  let entry = await fetchEntryText(req.params.name, pg)
    .catch(err => {throw err})
  let newEntry = false

  if (entry.name === '') {
    const addEntry = async () => {
      await pg('graphs').insert({
        'text': '',
        'img': '',
        'name': req.params.name,
        'outputUpdated': false
      }).then((item:object) => {
        console.timeLog(timeLogID)
        console.info(`${timeLogID}: NEW ITEM: \"${req.params.name}\"`)
      }).catch((err:Error) => {throw err})
    }

    await addEntry()

    entry = {
      text: '',
      name: req.params.name,
      outputUpdated: false
    }
    newEntry = true
  }

  return {...entry, newEntry: newEntry};
}