const mongoose = require('mongoose');

// Definição do esquema do usuário
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Garante que cada nome de usuário seja único
  },
  password: {
    type: String,
    required: true,
  },
});

// Exporta o modelo User baseado no esquema definido
module.exports = mongoose.model('User', UserSchema);
