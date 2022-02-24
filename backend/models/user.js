const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');


module.exports.userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau"
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Explorer"
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) => { return /^(http|https):\/\/(www.)?(.{1,}\/){1,}#?/.test(url); },
      message: props => `${props.value} is not a valid phone number!`
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg"
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => { return validator.isEmail(email); },
      message: props => `${props.value} wrong email`
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});




module.exports.userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', module.exports.userSchema);