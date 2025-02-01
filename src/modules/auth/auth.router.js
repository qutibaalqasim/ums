import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/model/user.model.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import validation from "../../midleware/validation.js";
import { sendEmail } from "../../utils/sendEmail.js";

const router = Router();

router.post('/register',validation(registerSchema), async (req, res) => {
  try{
    const { userName, email, password } = req.body;
   const hashedPassword = bcrypt.hashSync(password, 8);
    await userModel.create({ userName, email, password: hashedPassword });
    sendEmail(email,"Welcome",`<h2> hello ya ${userName} </h2>`);
    return res.status(201).json({ message: "success" });
  }catch(error){
    res.status(500).json({ message:"server message" , error:error.stack });
  }
  });
  
  router.post('/login', validation(loginSchema), async (req, res) => {
    try{
    const { email, password } = req.body;
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

