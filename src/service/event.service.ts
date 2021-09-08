import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
//@ts-ignore
import metaCount from "otp-generator"
import config from "config"
import { Event, EventDocument } from "../model/event.model"
import { Post, PostDocument } from "../model/post.model"
// import { User, UserDocument } from "../model/user.model"


export const createEvent = (input: { 
    post: DocumentDefinition<PostDocument>,
    safeId: string
    author: string
}) => {
    
    const { title, _id, createdAt } = input.post

    return Event.create({ 
        title: title,
        feed: _id,
        author: input.author, 
        eventId: input["safeId"],
        post_createdAt: createdAt
    })
}

export const findPost = (input: FilterQuery<PostDocument>, options: QueryOptions = { lean: true }) => {
    return Post.findOne(input, {}, options)
}

export const findEvent = (input: FilterQuery<EventDocument>, options: QueryOptions = { lean: true }) => {
    return Event.findOne(input, {}, options)
}

export const findEvents = (input: FilterQuery<EventDocument>, options: QueryOptions = { lean: true }) => {
    return Event.find(input, {}, options)
}

export const deleteEvent = (query: FilterQuery<EventDocument>) => {
    return Event.deleteOne(query)
}

export const generateEventId = async () => {

    let token = config.get("genToken") as number

    let latGen = metaCount.generate(4, { 
        upperCase: true,
        specialChars: false,
        alphabets: true
    })
    
    let metaGen = String(Math.floor(Math.random() * token)) 

    metaGen = `${latGen}${metaGen.length < 4 ? 
                '0'.repeat(4-metaGen.length).concat(metaGen) 
            : 
                metaGen
        }`
    ;
    const isEvent = await findEvent({ metaGen })

    if(!!isEvent) {
        console.log({ isEvent })
        generateEventId()
    }

    console.log({ metaGen })
    return metaGen as string
}