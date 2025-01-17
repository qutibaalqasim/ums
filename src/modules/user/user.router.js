import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req, res) => {
  const users = await userModel.findAll({
    attributes:["id","userName","email"],
  });
  return res.status(200).json({ message: "success", users });
});

router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const {token} = req.headers;

  const decoded = jwt.verify(token , 'qqq');

  if(decoded.role == 'user'){
    return res.status(403).json({ message: "this user not admin can't delete" });
  }
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
});


export default router;
