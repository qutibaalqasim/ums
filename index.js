import express from 'express';
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js'
const app = express();
app.use(express.json());
connectDB();

app.use('/users', userRouter);


app.listen(9000,()=>{
    console.log("running on port 9000...");
});