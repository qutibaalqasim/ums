import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";


 export const getUsers = async (req, res) => {

    const users = await userModel.findAll({
      attributes:["id","userName","email"],
    });
    return res.status(200).json({ message: "success", users });
  
  }


 export const deleteUsers = async (req,res,next)=>{
  
    const {id} = req.params;
    const user = await userModel.findByPk(id);
  
    if(user == null){
      return next(new AppError("user not found",404));
    }
  
    await userModel.destroy({
      where:{
        id
      },
    });
  
    return res.status(200).json({message:"user deleted successfully"});
  
  }

 export const updateImage  = async (req,res,next)=>{
  

    const {id} = req.params;
    const user = await userModel.findByPk(id);
    if(user == null){
      return next(new AppError("user not found",404));
    }
  
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);
     
     user.profilePic = secure_url;
     await user.save();
  
    return res.status(200).json({message:"updated user image successfully"})
  
  }