import { Router } from "express";
import auth from "../../midleware/auth.js";
import { getBlog, createBlog } from "./blog.controller.js";



const router = Router();

router.get('/', getBlog);

router.post('/' ,auth(), createBlog);


export default router;