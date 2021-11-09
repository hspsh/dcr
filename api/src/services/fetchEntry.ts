import { Knex } from "knex"

interface Entry {
  'input': string,
  'output': string,
  'name': string,
  'outputUpdated': boolean
}

export default async (name: string, pg:Knex) => {
  let result = await pg('graphs')
  .where({name: name}).select()
  .then((item:Array<Entry>) => item[0])
  .catch((err:Error) => {
    throw err
  })

  return result || {'input': '', 'output': '', 'name': '', 'outputUpdated': false}
}