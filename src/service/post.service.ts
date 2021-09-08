import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { Post, PostDocument } from "../model/post.model";


export const createPost = (input: DocumentDefinition<PostDocument>) => {
    return Post.create(input)
}

export const findPost = (input: FilterQuery<PostDocument>, options: QueryOptions = { lean: true }) => {
    return Post.findOne(input, {}, options) 
}

export const findAndUpdate = (query: FilterQuery<PostDocument>, update: UpdateQuery<PostDocument>, options: QueryOptions) => {
    return Post.findOneAndUpdate(query, update, options)
}

export const deletePost = (query: FilterQuery<PostDocument>) => {
    return Post.deleteOne(query)
}