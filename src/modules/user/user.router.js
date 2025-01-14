import { Router} from "express";
import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = Router();

router.get('/', async (req,res)=>{
    const users = await userModel.findAll();
    return res.status(200).json({message:"success",users});
});

router.post('/',async (req,res)=>{
    const {userName,email,passsword} = req.body;
    const hashedPassword = bcrypt.hashSync(passsword, 8);
    await userModel.create({userName,email,passsword:hashedPassword});
    return res.status(201).json({message:"success"});
});


router.post('/login',async (req,res)=>{
    const {email,passsword} = req.body;
    const user = await userModel.findOne({
        where:{
            email: email
        }
    });
    if(user == null){
        return res.status(404).json({message:"user not found"});
    }

    const check = await bcrypt.compareSync(passsword, user.passsword);
    if(check == false){
        return res.status(400).json({message:"wrong password"});
    }

    const token = jwt.sign({id:user.id,name:user.userName,email:user.email }, 'qqq');
    return res.status(200).json({message:"valid user",token});
});




export default router;