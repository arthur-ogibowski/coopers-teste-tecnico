const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Verificar se há um token no cabeçalho da requisição
  const token = req.header('x-auth-token');

  // Se não houver token, retornar status 401 e mensagem de erro
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Tentar verificar o token
  try {
    // Verificar o token usando jwt.verify, usando a chave secreta armazenada em process.env.JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adicionar o usuário decodificado ao objeto de requisição para uso posterior
    req.user = decoded.user;
    // Chamar o próximo middleware
    next();
  } catch (err) {
    // Em caso de erro na verificação do token, retornar status 401 e mensagem de erro
    res.status(401).json({ message: 'Token is not valid' });
  }
};
