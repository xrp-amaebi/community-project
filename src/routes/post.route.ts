import express, { Express, Request, Response } from "express"

import { validateRequest, requireUser } from "../middleware"
import { createPostHandler, updatePostHandler, getPostHandler, deletePostHandler } from "../controller/post.controller"
import { createPostSchema, updatePostSchema, deletePostSchema } from "../schema/post.schema"


export const postRouter = express.Router()

postRouter.route("/posts")
    .post([requireUser, validateRequest(createPostSchema)], createPostHandler)
;

postRouter.route("/posts/:postId")
    .put([requireUser, validateRequest(updatePostSchema)], updatePostHandler)
;

postRouter.route("/posts/:postId")
    .get(getPostHandler)
;

postRouter.route("/posts/:postId")
    .delete([requireUser, validateRequest(deletePostSchema)], deletePostHandler)
;