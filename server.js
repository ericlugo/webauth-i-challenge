const express = require('express');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routers/user-router.js');
const authRouter = require('./routers/authorization-router.js');

const sessionOptions = {
  name: 'specialCookie',
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('./data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(session(sessionOptions));

server.use('/api', authRouter);
server.use('/api/users', userRouter);

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
