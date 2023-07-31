import config from "config";
import mongoose from "mongoose";

const connectDB = async () => {
    const dbUri = config.get("dbUri") as string;
    mongoose.set("strictQuery", false);
   try {
        await mongoose.connect(dbUri);
        console.log("Database connected");
    } catch (err) {
        console.log("Db error", err);
        process.exit(1);
    }
}

export default connectDB
