const PORT = 3002;
const http = require('http');
const express = require('express');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(`mongodb+srv://user:userpassword@cluster0.buo9z.mongodb.net/virtual-pet-users?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
  })

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/users', usersRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})