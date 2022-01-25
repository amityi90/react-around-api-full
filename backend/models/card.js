const mongoose = require('mongoose');
const { userSchema } = require('./user')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => { return /^(http|https):\/\/(www.)?(.{1,}\/){1,}#?/.test(url); },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  owner: {
    type: Object,
    required: true,
  },
  likes: {
    type: [userSchema],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);