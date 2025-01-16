import express from 'express';
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js'
import authRouter from './src/modules/auth/auth.js';

const app = express();
app.use(express.json());
connectDB();

app.use('/users', userRouter);
app.use('/auth', authRouter);


app.listen(9000,()=>{
    console.log("running on port 9000...");
});