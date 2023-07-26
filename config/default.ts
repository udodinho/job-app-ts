import * as dotenv from "dotenv"
dotenv.config()

export default {
    port: process.env.PORT || 5000,
    host: "localhost",
    dbUri: process.env.MONGO_URI as string,
    saltWorkFactor: 10,
}