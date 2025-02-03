import { connectDB } from "../DB/connection.js";
import userRouter from './modules/user/user.router.js'
import authRouter from './modules/auth/auth.router.js';
import blogRouter from './modules/blog/blog.router.js';

const initApp = (app)=>{
    connectDB();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/blog', blogRouter);
}


export default initApp;