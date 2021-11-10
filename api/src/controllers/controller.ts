import { Request, Response } from "express";
import pg from '../db/connect'
import path from 'path'
import fetchImg from '../services/fetchImg'
import fetchText from '../services/fetchText'
import postText from '../services/postText'

let root = async (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '../views/root.json'))
}

let getName = async (req:Request, res:Response) => {
  fetchText(req, res, pg)
    .then(item => res.json(item))
    .catch(err => res.status(500).json({}))
}

let postName = async (req:Request, res:Response) => {
  postText(req, res, pg)
    .then(item => {
      item.exists ? res.json(item) : res.status(404).json(item)
    })
    .catch(err => res.status(500).json({}))
}

let image = async (req:Request, res:Response) => {
  fetchImg(req, res, pg)
    .then(item => item.exists ? res.json(item): res.status(404).json(item))
    .catch(err => res.status(500).json(err.response))
}

export {root, getName, postName, image}