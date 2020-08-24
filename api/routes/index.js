const express = require('express');

const router = express.Router();

const routesLoader = () => {
    
    router.use('/authenticate', require('./authenticate')());
    
    router.use('/v1', require('./v1')());
  
    return router;
  };
  
  module.exports = routesLoader;