const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema
const UserSchema = new Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = module.exports = mongoose.model('User', UserSchema);