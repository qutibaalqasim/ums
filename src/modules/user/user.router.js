import { Router} from "express";
import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/', async (req,res)=>{
    const users = await userModel.findAll();
    return res.status(200).json({message:"success",users});
});

router.post('/',async (req,res)=>{
    const {userName,email,passsword} = req.body;
    const hashedPassword = bcrypt.hashSync("passsword", 8);
    await userModel.create({userName,email,passsword:hashedPassword});
    return res.status(201).json({message:"success"});
});





export default router;