const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  surname: {
    type: String,
    required: true,
    minLength: 2,
  },
  userName: {
    type: String,
    required: true,
    minLength: 5,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
        minLength: 2,
      },
      author: {
        type: String,
        required: true,
        minLength: 2,
      },
      releaseDate: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
