import express, { Express, Request, Response } from "express"

import { validateRequest, requireUser } from "../middleware"
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema"
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller"
import { createUserHandler } from "../controller/user.controller"

export const sessionRouter = express.Router()

sessionRouter.route("/healthcheck")
    .get((req: Request, res: Response) => {
        res.sendStatus(200)
    })
;

sessionRouter.route("/users")
    .post(validateRequest(createUserSchema), createUserHandler)
;

sessionRouter.route("/sessions")
    .post(validateRequest(createUserSessionSchema), createUserSessionHandler)
;

sessionRouter.route("/sessions")
    .get(requireUser, getUserSessionsHandler)
;

sessionRouter.route("/sessions")
    .delete(requireUser, invalidateUserSessionHandler)
;
