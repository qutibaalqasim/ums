import { Router} from "express";
import userModel from "../../../DB/model/user.model.js";
const router = Router();

router.get('/', async (req,res)=>{
    const users = await userModel.findAll();
    return res.status(200).json({message:"success",users});
});




export default router;