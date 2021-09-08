import express, { Express, Request, Response } from "express"

import { validateRequest, requireUser } from "../middleware"
import { createEventHandler, getEventHandler, deleteEventHandler } from "../controller/event.controller"
import { createEventSchema, deleteEventSchema } from "../schema/event.schema"

export const eventRouter = express.Router()

eventRouter.route("/events/:postId")
    .post([requireUser, validateRequest(createEventSchema)], createEventHandler)
;

eventRouter.route("/events/:eventId")
    .get(getEventHandler)
;

eventRouter.route("/events/:eventId")
    .delete([requireUser, validateRequest(deleteEventSchema)], deleteEventHandler)
;