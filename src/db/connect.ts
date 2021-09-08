import mongoose from "mongoose"
import config from "config"

export const connect = () => {
    const dbUri = config.get("dbUri") as string
    
    return mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected.")
    }).catch(error => {
        console.log({
            type: "database sys-error",
            error
        })
        process.exit(1)
    })
}