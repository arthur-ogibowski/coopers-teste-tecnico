const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// GET /api/todos - Obter todos os todos
router.get('/', auth, async (req, res) => {
  try {
    // Buscar todos os todos do usuário autenticado
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/todos - Criar um novo todo
router.post('/', auth, async (req, res) => {
  const { title, completed } = req.body;

  try {
    // Criar um novo todo associado ao usuário autenticado
    const newTodo = new Todo({
      title,
      completed,
      user: req.user.id,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/todos/:id - Atualizar um todo
router.put('/:id', auth, async (req, res) => {
  const { title, completed } = req.body;

  try {
    // Buscar o todo pelo ID fornecido
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Verificar se o usuário possui permissão para editar o todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Atualizar o todo e retornar o novo documento atualizado
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { title, completed } },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/todos/:id - Deletar um todo
router.delete('/:id', auth, async (req, res) => {
  try {
    // Buscar o todo pelo ID fornecido
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Verificar se o usuário possui permissão para deletar o todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Deletar o todo e retornar uma mensagem de sucesso
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed todo' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/todos - Deletar todos os todos com base no parâmetro 'completed'
router.delete('/', auth, async (req, res) => {
  const { completed } = req.query;

  try {
    const query = { user: req.user.id };
    
    // Se o parâmetro 'completed' estiver presente, filtrar pelo estado de completude
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    // Deletar todos os todos que correspondem à query e retornar uma mensagem de sucesso
    await Todo.deleteMany(query);
    res.json({ message: 'Removed todos' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
