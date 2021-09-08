import { Express } from "express"

import { sessionRouter } from "./routes/session.route"
import { postRouter } from "./routes/post.route"
import { eventRouter } from "./routes/event.route"

export default (app: Express) => {
    app.use('/api/', [sessionRouter, postRouter, eventRouter])
}