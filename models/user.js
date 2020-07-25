const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  passwordHash: String,
  petName: String,
  petType: String,
  petHunger: Number,
  petHappiness: Number
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;