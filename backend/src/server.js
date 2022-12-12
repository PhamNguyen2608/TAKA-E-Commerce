const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const database = require('./configs/database');
const { createServer } = require('http');
// const createServer = require('./helpers/create_server');
const Logger = require('./helpers/logger');
const createSocketConnections = require('./helpers/websocket_connection');
const applyMiddlewares = require('./middlewares');
const errorHandler = require('./middlewares/error_handler');
const routes = require('./routes');
const ConnectSocket = require('./configs/socket.js');
const paypal = require('paypal-rest-sdk');
dotenv.config();
database.connect();
paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});
const PORT = process.env.PORT || 8080;

function lauchServer(port) {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(errorHandler);
  applyMiddlewares(app);
  routes(app);

  const server = createServer(app);
  ConnectSocket(server);

  server.listen(port, () => {
    Logger.info(`App is listening at ${port}`);
  });
}

lauchServer(Number(PORT));
