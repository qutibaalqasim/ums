import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/model/user.model.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const router = Router();

router.post('/register', async (req, res) => {
  try{
    const { userName, email, password } = req.body;
   const result =  registerSchema.validate({userName, email, password},{abortEarly:false});
   if(result.error){
    return res.status(400).json({message:"validation error", error:result.error});
   }

   const hashedPassword = bcrypt.hashSync(password, 8);
    await userModel.create({ userName, email, password: hashedPassword });
    return res.status(201).json({ message: "success" });
  }catch(error){
    res.status(500).json({ message:"server message" , error });
  }
  });
  
  router.post('/login', async (req, res) => {
    try{
    const { email, password } = req.body;
    const result =  loginSchema.validate({ email, password},{abortEarly:false});

    if(result.error){
    return res.status(400).json({message:"validation error", error:result.error});
    }
  
    const user = await userModel.findOne({
      where: { email },
    });
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const check = bcrypt.compareSync(password, user.password);
    if (check == false) {
      return res.status(400).json({ message: "Wrong password" });
    }
  
    const token = jwt.sign(
      { id: user.id, name: user.userName, role: user.role },
       'qqq' 
    );
  
    return res.status(200).json({ message: "Valid user", token });
  }catch(error){
    res.status(500).json({ message:"server message" , error });
  }
  });


  export default router;

