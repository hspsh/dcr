import express from 'express'
import router from './router'
import path from 'path'

const app = express()

const port = 8090
const host = "localhost"

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") // TODO: change to only allow certain host
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use('/', router)
app.use('/bucket',express.static(path.join(__dirname, '../public/bucket')))

app.listen(port, host, () => {
  console.log(`Server listing at http://${host}:${port}`);

});

