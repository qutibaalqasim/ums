import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req, res) => {
  const users = await userModel.findAll();
  return res.status(200).json({ message: "success", users });
});

router.post('/', async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  await userModel.create({ userName, email, password: hashedPassword });
  return res.status(201).json({ message: "success" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userModel.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const check = bcrypt.compareSync(password, user.password);
  if (!check) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user.id, name: user.userName, email: user.email },
     'qqq' 
  );

  return res.status(200).json({ message: "Valid user", token });
});

export default router;
