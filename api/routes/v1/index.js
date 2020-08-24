const express = require('express');
const authenticate = require("../../../server/middlewares/authenticate");

module.exports = () => {
  const router = express.Router();

  router.use('/clients', require('./clients')([authenticate]));
  
  return router;
};