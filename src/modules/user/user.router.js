import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import auth from "../../midleware/auth.js";

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


export default router;
