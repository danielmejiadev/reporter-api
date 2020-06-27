// Dependencies
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
const routes = require('./routes');
const swaggerDocument = swaggerJSDoc(swaggerOptions);

/**
 * Run the REST API service.
 */
function runServer() {
  const app = express();
  app.use(express.json());
  app.use('/', routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port: ${port}`));
}

runServer();