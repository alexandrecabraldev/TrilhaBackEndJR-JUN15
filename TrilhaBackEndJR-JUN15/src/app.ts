import express from "express"
import { userRouter } from "./routes/user.routes";
import { env } from "./dotenvConfig";
import { loginRouter } from "./routes/login.routes";
import { taskRoute } from "./routes/task.routes";

const app = express();
app.use(express.json());

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/task', taskRoute)


app.listen(env.PORT,()=>{
    console.log(`server is running on port ${env.PORT}`)
})