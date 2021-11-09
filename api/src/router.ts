import express from 'express'
const router = express.Router()
import * as controller from './controllers/controller'
// import path from 'path'
// import * as fs from 'fs/promises'

router.get('/', async (req, res) => controller.root(req, res))

router.get('/p/:name', async (req, res) => controller.getName(req, res))
router.post('/p/:name', async (req, res) => controller.postName(req, res))

router.get('/i/:name', async (req, res) => controller.image(req, res))

export default router
