import { connectDB } from "../DB/connection.js";
import userRouter from './modules/user/user.router.js'
import authRouter from './modules/auth/auth.router.js';
import blogRouter from './modules/blog/blog.router.js';
import cors from 'cors';
const initApp = (app)=>{
    connectDB();
    app.get('/', (req,res)=>{
        res.status(200).json({message:"Welcome"});
    });
app.use(cors());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/blog', blogRouter);

app.get('*', (req,res)=>{
    return res.status(404).json({message:"page not found"});
});

app.use( (err,req,res,next)=>{
    return res.status(err.statusCode).json({message:err.message});
});
}


export default initApp;