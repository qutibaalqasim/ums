import { Router } from "express";
import auth from "../../midleware/auth.js";
import { getBlog, createBlog } from "./blog.controller.js";
import { asyncHandler } from "../../utils/catchError.js";



const router = Router();

router.get('/', asyncHandler(getBlog) );

router.post('/' ,auth(), asyncHandler(createBlog) );


export default router;