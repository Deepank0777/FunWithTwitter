let mongoose = require('mongoose');

var Schema = mongoose.Schema;
// ID First Name Last Name Company Name  Age  City State Zip Email Web

var userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: Number,
    required: false,
    default: 0
  },
  password: {
    type: String,
    required: true,
    hideJSON: true
  }
}, { collection: 'user' , timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
 
module.exports = mongoose.model('User', userSchema);