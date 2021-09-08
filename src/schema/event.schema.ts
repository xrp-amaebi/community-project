import { object, string } from "yup"


const body = object({
    title: string().required("Event Title is required"),
    author: string().required("authorId is required"),
    eventId: string().required("eventId is required").min(10, "EventId is too short - should be 10 chars minimum.."),
})

const params  = ({
    params: object({
        postId: string().required("postId is required"),
    })
})

const _params  = ({
    params: object({
        postId: string().required("eventId is required"),
    })
})


export const createEventSchema = object({
    ...params
})

export const deleteEventSchema = object({
    ..._params
})