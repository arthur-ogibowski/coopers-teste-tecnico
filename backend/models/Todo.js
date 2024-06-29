const mongoose = require('mongoose');

// Definição do esquema do Todo
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de usuário associado a este Todo
  },
});

// Exportar o modelo Todo baseado no esquema definido
module.exports = mongoose.model('Todo', TodoSchema);
