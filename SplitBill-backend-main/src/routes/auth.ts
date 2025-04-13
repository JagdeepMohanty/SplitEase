import bcrypt from "bcrypt";
import { Router } from "express";
import Joi from "joi";
import User from "../models/user";
import { Request, Response } from "express";

const router = Router();

router.get("/ping", async (_: Request, res: Response) => {
  res.send("Connected to Server...");
});

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).send("User not found. Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

router.post("/updateToken", async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  const token = user.generateAuthToken();
  res.send(token);
});

interface AuthRequest {
  email: string;
  password: string;
}

const validate = (req: AuthRequest) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };

  return Joi.object(schema).validate(req);
};

export default router;
