import jwt from 'jsonwebtoken';


const auth = ()=>{
    
    return (req,res,next)=>{
        const {token} = req.headers;
        
        const decoded = jwt.verify(token , 'qqq');

        if(decoded.role == 'user'){
            return res.status(403).json({ message: "not authrized user" });
          }

            next();
        }
}


export default auth;