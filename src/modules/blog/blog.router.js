import { Router } from "express";
import auth from "../../midleware/auth.js";
import { getBlog, createBlog, getBlogDetails } from "./blog.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
import { blogDetailsSchema, createBlogSchema } from "./blog.validation.js";
import validation from "../../midleware/validation.js";



const router = Router();

router.get('/', asyncHandler(getBlog) );

router.post('/' ,auth(),validation(createBlogSchema), asyncHandler(createBlog) );

router.get('/:id',validation(blogDetailsSchema,'params'), asyncHandler(getBlogDetails));

export default router;