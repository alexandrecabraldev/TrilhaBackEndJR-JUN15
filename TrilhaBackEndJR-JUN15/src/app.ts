import express from "express"
import { userRouter } from "./routes/user.routes";
import { env } from "./dotenvConfig";

const app = express();
app.use(express.json());

app.use('/user', userRouter)


app.listen(env.PORT,()=>{
    console.log(`server is running on port ${env.PORT}`)
})