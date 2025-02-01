import multer from 'multer';
import { nanoid } from 'nanoid';


function fileUpload(){

    function fileFilter(req,file,cb){
        if(file.mimetype == 'image/jpeg'  || file.mimetype == 'image/png'){
            cb(null, true);
        }

        else{
            cb("invalid files", false);
        }
    }

    const upload = multer({fileFilter});
    return upload;
};

export default fileUpload;