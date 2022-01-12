import { Request, Response } from 'express'
import crypto from 'crypto'
import pg from '../db/connect'
import path from 'path'
import fetchImg from '../services/fetchImg'
import fetchText from '../services/fetchText'
import postText from '../services/postText'

let root = async (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '../views/root.json'))
}

let text = async (req:Request, res:Response) => {
  const id = "fetchText " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  fetchText(req, res, pg, id)
    .then(item => res.json(item))
    .catch(err => res.status(500).json({}))
    .finally(() => console.timeEnd(id))
}

let sendText = async (req:Request, res:Response) => {
  const id = "postText " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  postText(req, res, pg, id)
    .then(item => {
      item.exists ? res.json(item) : res.status(404).json(item)
    })
    .catch(err => res.status(500).json({}))
    .finally(() => console.timeEnd(id))
}

let image = async (req:Request, res:Response) => {
  const id = "fetchImg " + crypto.randomBytes(4).toString("hex")
  console.time(id)
  fetchImg(req, res, pg, id)
    .then(item => item.exists ? res.json(item): res.status(404).json(item))
    .catch(err => res.status(500).json({}))
    .finally(() => console.timeEnd(id))
}

export {root, text, sendText, image}