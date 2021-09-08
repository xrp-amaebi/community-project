import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose"
import { get } from "lodash"
import config from "config"

import { findUser } from "./user.service"
import { Session, SessionDocument } from "../model/session.model"
import { UserDocument } from "../model/user.model"
import { sign, decode } from "../utils/jwt.utils"


export const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({ user: userId, userAgent })

    return session.toJSON()
}

export const createAccessToken = ({ user, session }: {
    user: 
        |  Omit<UserDocument, "password">
        |  LeanDocument<Omit<UserDocument, "password">>;
    session:
        |  Omit<SessionDocument, "password">
        |  LeanDocument<Omit<SessionDocument, "password">>;
}) => {

    const accessToken = sign({ 
        ...user, 
        session: session["_id"]
    },{ 
        expiresIn: config.get("accessTokenTtl")
    })

    return accessToken
}

export const reIssueAccessTokens = async ({ refreshToken }: {
    refreshToken: string
}) => {
    const { decoded } = decode(refreshToken)

    if(!decoded || !get(decoded, "_id")){
        return false
    }

    const session = await Session.findById(get(decoded, "_id"))

    if(!session || !session?.valid) {
        return false 
    }

    const user = await findUser({ _id: session.user })

    if(!user) {
        return false 
    }

    const accessToken = createAccessToken({ user, session })

    return accessToken
}

export const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
    return Session.updateOne(query, update)
}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    return Session.find(query).lean()
}