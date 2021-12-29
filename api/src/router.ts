import express from 'express'
const router = express.Router()
import * as controller from './controllers/controller'

router.get('/', async (req, res) => controller.root(req, res))

router.get('/p/:name', async (req, res) => controller.text(req, res))
router.post('/p/:name', async (req, res) => controller.sendText(req, res))

router.get('/i/:name', async (req, res) => controller.image(req, res))

export default router
