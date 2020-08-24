'use strict';

const express = require('express');

const clientsController = require('../../controllers/v1/ClientsController');

module.exports = middlewares => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach(middleware => router.use(middleware));
  }

  router.get('/highest_total_purchase', clientsController.highest_total_purchase);
  router.get('/biggest_single_purchase', clientsController.biggest_single_purchase);
  router.get('/most_loyal', clientsController.most_loyal);
  router.get('/recommend_wine/:cpf', clientsController.recommend_wine);
  
  return router;
};
