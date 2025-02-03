import blogModel from "../../../DB/model/blog.model.js";
import userModel from "../../../DB/model/user.model.js";


export const getBlog = async (req,res)=>{
    try{
        const blogs = await blogModel.findAll({
            attributes:['id','title'],
            include:{
                model:userModel,
                attributes:['id','userName']
            }
        });
    return res.status(200).json({message:"success" , blogs});
    }catch(error){
        return res.status(500).json({message:"server error", error});
    }
    
}


export const createBlog =  async (req,res)=>{
    try{
        const {title, description} = req.body;
        const blog = await blogModel.create({title, description,UserId:req.id});
        return res.status(200).json({message:"success" , blog});
    }catch(error){
        return res.status(500).json({message:"server error", error});
    }
   
}