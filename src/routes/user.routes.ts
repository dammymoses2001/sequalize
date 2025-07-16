import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users", getAllUsers).post("/users", createUser);

export default router;
