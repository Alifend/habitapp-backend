import express, { Router } from "express";
import {
  getTasks,
  getTask,
  editTask,
  deleteTask,
  addTask,
} from "../controllers/taskController.js";
import {
  getUser,
  editUser,
  deleteUser,
  addUser,
  userLogin,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/registro", addUser);
userRouter.post("/login", userLogin);
userRouter.get("/:uid", getUser);
userRouter.put("/:uid", editUser);
userRouter.delete("/:uid", deleteUser);

userRouter.get("/:uid/tasks", getTasks); // eso está bueno
userRouter.get("/:uid/task/:tid", getTask); // eso está bueno
userRouter.delete("/:uid/task/:tid", deleteTask); // eso está bueno
userRouter.put("/:uid/task/:tid", editTask);
userRouter.post("/:uid/task", addTask);

export default userRouter;
