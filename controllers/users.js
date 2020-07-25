const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    fullName: body.fullName,
    name: body.name,
    passwordHash,
    petName: '',
    petType: '',
    petHunger: -1,
    petHappiness: -1,
  });

  const savedUser = await user.save();

  response.json(savedUser);
})

module.exports = usersRouter