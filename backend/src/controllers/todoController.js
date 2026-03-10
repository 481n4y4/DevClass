import Todo from "../models/Todo.js";

// CREATE
export const createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const todo = await Todo.create({
      user: req.user._id,
      title,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Akses ditolak" });
    }

    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed ?? todo.completed;

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Akses ditolak" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
