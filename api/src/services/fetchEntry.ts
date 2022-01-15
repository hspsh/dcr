import { Knex } from "knex"

interface Entry {
  'text': string,
  'name': string,
  'img': string,
  'outputUpdated': boolean
}

interface EntryText {
  'text': string,
  'name': string,
  'outputUpdated': boolean
}

const fetchEntry = async (name: string, pg:Knex) => {
  let result = await pg('graphs')
  .where({name: name}).select('name', 'text', 'img', 'outputUpdated')
  .then((item:Array<Entry>) => item[0])
  .catch((err:Error) => {
    throw err
  })

  return result
}

const fetchEntryText = async (name: string, pg:Knex) => {
  let result = await pg('graphs')
  .where({name: name}).select('name', 'text', 'outputUpdated')
  .then((item:Array<EntryText>) => item[0])
  .catch((err:Error) => {
    throw err
  })

  return result
}

export { fetchEntry, fetchEntryText }