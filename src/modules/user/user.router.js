import { Router } from "express";
import auth from "../../midleware/auth.js";
import fileUpload from "../../utils/multer.js";
import { asyncHandler } from "../../utils/catchError.js";
import { deleteUsers, getUsers, updateImage } from "./user.controller.js";

const router = Router();

router.get('/', auth() , asyncHandler(getUsers) );
router.delete('/:id', auth() , asyncHandler(deleteUsers));
router.put('/:id', fileUpload().single('image'), asyncHandler(updateImage));


export default router;
