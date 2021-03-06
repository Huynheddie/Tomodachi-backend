const bcrypt = require('bcryptjs');
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
    petAge: new Date()
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.patch('/:id', async (request, response) => {
  const body = request.body;
  const newUser = {
    petName: body.petName,
    petType: body.petType,
    petHunger: 100,
    petHappiness: 100,
    petAge: new Date()
  }

  const user = await User.findByIdAndUpdate(request.params.id, newUser, { new: true });
  response.json(user)
})

usersRouter.patch('/update/:id', async (request, response) => {
  const body = request.body;
  const user = await User.findByIdAndUpdate(request.params.id, request.body,  { new: true });
  response.json(user);
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user)
})

usersRouter.get('/visit/:username', async (request, response) => {
  const user = await User.findOne({ username: request.params.username });
  response.json(user);
})

module.exports = usersRouter