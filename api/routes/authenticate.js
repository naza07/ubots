const express = require('express');
const authenticateController = require('../controllers/v1/AuthenticateController');

module.exports = () => {
  const router = express.Router();

  router.post('/login', authenticateController.login);

  return router;
};
