import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // semua route di bawah ini wajib login

router.route("/")
  .post(createTodo)
  .get(getTodos);

router.route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);

export default router;
