const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// const userRouter = require('./routers/user-router.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
// server.use('/api/register', userRouter.register);
// server.use('api/login', userRouter.login);
// server.use('/api/users', userRouter);

server.get('/', (request, response) => {
  response.send(`
    <h1>WebAuth I Challenge</h1>
    <p>Please see the <a href='https://github.com/ericlugo/webauth-i-challenge'>README</a> for more information on where to go!</p>
  `);
});

server.get('/api', (request, response) => {
  response.send(`
    <h1>Looking for API Information?</h1>
    <p>Please see the <a href='https://github.com/ericlugo/webauth-i-challenge'>README</a> for more information on where to go!</p>
  `);
});

module.exports = server;
