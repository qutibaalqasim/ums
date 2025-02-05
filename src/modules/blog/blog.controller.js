import blogModel from "../../../DB/model/blog.model.js";
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/appError.js";


export const getBlog = async (req,res)=>{
   
        const blogs = await blogModel.findAll({
            attributes:['id','title'],
            include:{
                model:userModel,
                attributes:['id','userName']
            }
        });
    return res.status(200).json({message:"success" , blogs});
    
    
}


export const createBlog =  async (req,res)=>{
    
        const {title, description} = req.body;
        const blog = await blogModel.create({title, description,UserId:req.id});
        return res.status(200).json({message:"success" , blog});
   
   
}


export const getBlogDetails = async (req,res,next)=>{
    const {id} = req.params;

    const blog = await blogModel.findByPk(id);
    if(blog == null){
        return next(new AppError("couldn't find blog",404));
    }

    return res.status(200).json({message:"success", blog});

}