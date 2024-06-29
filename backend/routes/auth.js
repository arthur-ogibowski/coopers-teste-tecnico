const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register - Registrar um novo usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário já existe no banco de dados
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criar um novo usuário com senha criptografada
    user = new User({ username, password });

    // Gerar um salt para hash da senha e criptografar a senha
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salvar o usuário no banco de dados
    await user.save();

    // Preparar o payload do JWT com o ID do usuário
    const payload = { user: { id: user.id } };

    // Assinar o token JWT com o segredo do ambiente e definir o tempo de expiração
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      // Retornar o token como resposta da requisição de registro
      res.json({ token });
    });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).send('Erro no servidor');
  }
});

// POST /api/auth/login - Autenticar usuário e obter token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verificar se a senha fornecida corresponde à senha criptografada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Preparar o payload do JWT com o ID do usuário
    const payload = { user: { id: user.id } };

    // Assinar o token JWT com o segredo do ambiente e definir o tempo de expiração
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      // Retornar o token como resposta da requisição de login
      res.json({ token });
    });
  } catch (err) {
    console.error('Error authenticating user:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
