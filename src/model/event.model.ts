import mongoose from 'mongoose'
//@ts-ignore
import metaCount from "otp-generator"
import config from "config"

import { PostDocument } from './post.model'
import { UserDocument } from "./user.model"

export interface EventDocument extends mongoose.Document {
    author: UserDocument["_id"];
    feed: PostDocument["_id"];
    title: string;
    eventId: string;
    post_createdAt: Date;
}

const EventSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    feed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    title: {
        type: String,
    },
    eventId: {
        type: String
    },
    post_createdAt: {
        type: Date
    },
    impressions:  {
        type: String,
        trim: true
    }
}, { 
    timestamps: true
})

// Generate eventId
EventSchema.pre("save", async function(next: mongoose.HookNextFunction){
    // let event = this as EventDocument

    return next()
})

export const Event = mongoose.model<EventDocument>("Event", EventSchema)

