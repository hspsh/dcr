import { Request, Response } from 'express'
import { fetchEntry } from './fetchEntry'
import { Knex } from 'knex'

export default async (req:Request, res:Response, pg:Knex, timeLogID:string) => {
  let entry = await fetchEntry(req.params.name, pg)
    .catch(err => { throw err})
  let exists = true

  if (entry.name === '') {
    exists = false
    console.info(`${timeLogID} ITEM \"${req.params.name}\" DOES NOT EXIST`)
    return {status: "Does not exist!", exists}
  } else if (entry.text === req.body.content) {
    console.info(`${timeLogID} TEXT NOT CHANGED`)
    return {status: "Text not changed", exists}
  }

  try {
    await pg('graphs').where({name: req.params.name}).update({outputUpdated: false, text: req.body.content}, ["name", "outputUpdated", "text"])
    return ({status: "Updated!", exists})
  } catch (err) {
    console.error(`${timeLogID} ERROR: ${err}`)
    return ({status: "Error while editing entry!", exists})
  }
}