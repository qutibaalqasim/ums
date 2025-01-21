import jwt from 'jsonwebtoken';


const auth = ()=>{
    
    return (req,res,next)=>{
        try{
        const {token} = req.headers;
        
        const decoded = jwt.verify(token , 'qqq');

        if(decoded.role == 'user'){
            return res.status(403).json({ message: "not authrized user" });
          }

            next();
        }catch(error){
            return res.status(500).json({message:"server error", error});
        }
    }
}


export default auth;