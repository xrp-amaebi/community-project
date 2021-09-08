import mongoose from 'mongoose'
import { EventDocument } from './event.model'
import { UserDocument } from "./user.model"

export interface PostDocument extends mongoose.Document {
    author: UserDocument["_id"];
    event: EventDocument["eventId"];
    title: string;
    postId: string;
    body: string;
    location: string;
    venue: string;
    prize: string;
    eventType: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    },
    title: {
        type: String,
    },
    body: {
        type: String
    },
    postId: {
        type: String
    },
    eventType: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true
    },
    venue: {
        type: String,
        trim: true
    },
    date: {
        type: Date
    },
    prize: {
        type: String,
        trim: true
    }
}, { 
    timestamps: true
})

// Generate postId 
PostSchema.pre("save", async function( next: mongoose.HookNextFunction){
    let post = this as PostDocument
    let postId = this["_id"]

    if(!postId){
        return next()
    }

    post.postId = String(postId)

    return next()
})

export const Post = mongoose.model<PostDocument>("Post", PostSchema)