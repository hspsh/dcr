import express from "express"
const router = express.Router()
import path from 'path'
import * as fs from 'fs/promises'
import pg from './db/connect' //import politechnika gdanska from db/connect
import {exec} from 'child_process'

//TODO move code to controllers

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/home.json'))
})

interface Entry {
  'input': string,
  'output': string,
  'name': string,
  'outputUpdated': boolean
}

let fetchEntry = async (name: string) => {
  let result = await pg('graphs')
  .where({name: name}).select()
  .then((item:Array<Entry>) => item[0])
  .catch((err:Error) => console.error(err))

  return result || {'input': '', 'output': '', 'name': '', 'outputUpdated': false}
}

router.get('/p/:name', async (req, res) => {
  let entry = await fetchEntry(req.params.name)
  let newEntry = false

  if (!entry) {
    let addEntry = async () => {
      await pg('graphs').insert({
        'input': `./bucket/${req.params.name}`,
        'output': `./bucket/${req.params.name}`,
        'name': req.params.name,
        'outputUpdated': false
      }).then((item:any) => {
        console.log("NEW ITEM")
        console.table(item)
      })
    }

    await addEntry()

    entry = await fetchEntry(req.params.name)
    newEntry = true
  }

  res.json({...entry, newEntry: newEntry});
})

class filesClass {
  input: string
  output: string

  constructor(input:string, output:string) {
    this.input = path.join(__dirname, "../public", `${input}.gz`)
    this.output = path.join(__dirname, "../public", `${output}.png`)
  }
}

router.post('/p/:name', async (req, res) => {
  let entry  = await fetchEntry(req.params.name)
  let files = new filesClass(entry.input, entry.output)
  fs.writeFile(files.input, req.body.content)
    .then(async () => {
      res.send({status: "Everything guitar'a bq!"})
      await pg('graphs').where({name: req.params.name}).update({outputUpdated: false}, ["name", "outputUpdated"])
        .catch((err:Error) => console.error(err))
    })
    .catch(err => {
      res.send({status: "Error?!?!?!? TF?!?!"})
      console.error(err)
    })
})
router.get('/i/:name', async (req, res) => {
  let entry = await fetchEntry(req.params.name)
  let files = new filesClass(entry.input, entry.output)

  if(entry.outputUpdated === true) {
    res.json({file: entry.output, updated: false, error: false})
  } else {
    exec(`dot -Tpng ${files.input} -o ${files.output}`, async (err, stdout, stderr) => {
      if (err || stderr) {
        if (err) {
          console.error(err.message)
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
        }
        res.json({file: entry.output, updated: false, error: true})
      } else {
          res.json({file: entry.output, updated: true, error: false})
          await pg('graphs').where({name: req.params.name}).update({outputUpdated: true}, ["name", "outputUpdated"])
            .catch((err:Error) => console.error(err))
      }
    })
  }
})

export default router
