import express from "express"
import config from "config"
import cors from 'cors'
import { connect } from './db/connect'
import router from './routes'
import { deserializeUser } from "./middleware"
// import { log } from "./log"

const port = config.get("port") as number
const host = config.get("host") as string


const app = express()

app.use(deserializeUser)
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, () => {
    console.log(`server listening at http://${host}:${port}`)

    connect()
    router(app)
})