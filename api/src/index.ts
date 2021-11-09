import express from 'express'
import router from './router'
import path from 'path'

const app = express()

const port = 8090
const host = "localhost"

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json())

app.use('/', router)
app.use('/bucket',express.static(path.join(__dirname, '../public/bucket')))

app.listen(port, host, () => {
  console.log(`Server listing at http://${host}:${port}`);

});