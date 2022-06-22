import express from 'express'
import {fileURLToPath} from 'url'
import { dirname, join } from 'path'
import indexRoutes from './routes/index.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
app.use(indexRoutes)

app.use(express.static(join(__dirname, 'public')))

app.listen(3000)
console.log(`Server started on port`, 3000);