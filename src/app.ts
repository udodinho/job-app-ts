import "express-async-errors";
import express from "express";
import config from "config";
import connectDB from "./db/connect";
import authRoutes from "./routes/auth-route";
import jobsRoutes from "./routes/job-route";
import NotFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import { authenticateUser } from "./middleware/auth-middleware";

const port = config.get("port") as number;
const host = config.get("host" as string);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobsRoutes);

app.use(errorHandlerMiddleware)
app.use(NotFound)

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is listening at http://${host}:${port}`);  
        })
    } catch (error) {
        console.log(error);
    }
}

start();
