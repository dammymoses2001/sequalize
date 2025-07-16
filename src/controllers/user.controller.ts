import { Request, Response } from "express";
import User from "../sequelize/models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findAll();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
