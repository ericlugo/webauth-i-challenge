const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/user-model.js');
const validateUser = require('../middleware/validate-user.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = req.body;
  if (!user.username || !user.password)
    res.status(400).json({
      success: false,
      message: `Requests must contain 'username' and 'password'.`,
    });
  try {
    const newUser = await Users.add({
      user_name: user.username,
      pass_hash: bcrypt.hashSync(user.password, 10),
    });
    res.status(201).json({
      success: true,
      message: `User successfully registered.`,
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error\n${err}`,
    });
  }
});

router.post('/login', validateUser, async (req, res) => {
  const { username } = req.body;
  const user = await Users.findBy({ user_name: username });

  req.session.loggedIn = true;
  req.session.user = {
    username: user.user_name,
  };

  res.status(200).json({
    success: true,
    message: `Welcome ${username}!`,
  });
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('You shall not pass!!!');
      } else {
        res.send('You done it!');
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
