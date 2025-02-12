import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  
    const { userName, email, password } = req.body;
   const hashedPassword = bcrypt.hashSync(password, 8);
    await userModel.create({ userName, email, password: hashedPassword });
    sendEmail(email,"Welcome",`<h2> hello ya ${userName} </h2>`);
    return res.status(201).json({ message: "success" });
  
  }


 export const login = async (req, res,next) => {
    
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: { email },
    });
    if (user == null) {
     return next(new AppError("invalid Email",404));
    }
    const check = bcrypt.compareSync(password, user.password);
    if (check == false) {
     return next(new AppError("Invalid password",400));
    }
    const token = jwt.sign(
      { id: user.id, name: user.userName, role: user.role },
       'qqq' 
    );
    return res.status(200).json({ message: "Valid user", token });
  
  }