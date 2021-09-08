import { Request, Response } from "express"
import { get } from "lodash"

import { findPost } from "../service/post.service"
import { createEvent, findEvent, generateEventId, deleteEvent } from "../service/event.service"

export const createEventHandler =  async (req: Request, res: Response) => {
    const author = get(req, "user[_id]")

    const postId = get(req, "params[postId]")

    const post = await findPost({ postId })

    if(!post) {
        return res.sendStatus(404)
    }

    if(String(post.author) !== author) {
        return res.sendStatus(401)
    }

    // const meta_data = req.body
    const safeId = await generateEventId()

    if(!safeId) {
        return res.sendStatus(400).json({ msg: "generation failed" })
    }

    const event =  await createEvent({
        post,
        author,
        safeId
    })

    return res.send(event)
}

export const getEventHandler = async (req: Request, res: Response) => {
    const eventId = get(req, "params[eventId]")
    const event = await findEvent({ eventId })

    if(!event) {
        return res.sendStatus(404)
    }

    return res.send(event)
}

export const deleteEventHandler = async (req: Request, res: Response) => {
    const userId = get(req, "user[_id]")

    const eventId = get(req, "params[eventId]")

    const event = await findEvent({ eventId })

    if(!event) {
        return res.sendStatus(404)
    }

    if(String(event.author) !== String(userId)) {
        return res.sendStatus(401)
    }

    await deleteEvent({ eventId })

    return res.sendStatus(200)
}