import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import auth from "../../midleware/auth.js";
import fileUpload from "../../utils/multer.js";
import cloudinary from "../../utils/cloudinary.js";

const router = Router();

router.get('/', auth() , async (req, res) => {
  try{
  const users = await userModel.findAll({
    attributes:["id","userName","email"],
  });
  return res.status(200).json({ message: "success", users });
}catch(error){
  return res.status(500).json({ message:"server error", error });
}
});

router.delete('/:id', auth() ,async (req,res)=>{
  try{
  const {id} = req.params;
  const user = await userModel.findByPk(id);

  if(user == null){
    return res.status(404).json({ message: "User not found" });
  }

  await userModel.destroy({
    where:{
      id
    },
  });

  return res.status(200).json({message:"user deleted successfully"});
}catch(error){
  return res.status(500).json({ message:"server error", error });
}
});

router.put('/:id', fileUpload().single('image'),async (req,res)=>{
  try{

    //return res.json(req.file);
  const {id} = req.params;
  const user = await userModel.findByPk(id);
  if(user == null){
    return res.status(404).json({ message: "User not found" });
  }

  const {secure_url} = await cloudinary.uploader.upload(req.file.path);
   
   user.profilePic = secure_url;
   await user.save();

  return res.status(200).json({message:"updated user image successfully"})
}catch(error){
  return res.status(500).json({ message:"server error", error });
}
});


export default router;
