const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routesLoader = require('./api/routes');
const urlNotFound = require('./server/middlewares/url-not-found');

//Expose API openapi documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Load API routes
app.use("/api", routesLoader());

// HTTP 404 handler
app.use(urlNotFound());

app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
    console.info(
      `Server is running on: http://0.0.0.0:${process.env.PORT || 3000}`
    );

    console.info('To shut down, press <CTRL> + C at any time.');
  });