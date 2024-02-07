const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: String,
  lastname: String,
  password: { type: String, required: true }, // Consider hashing passwords in a real app
  createon: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);