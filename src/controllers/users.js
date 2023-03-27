const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => res.status(500).send(e.message));
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  return User.findById(user_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).send("not found");
      } else {
        res.status(500).send(e.message);
      }
    });
};

const getUserBooks = (req, res) => {
  const { user_id } = req.params;
  return User.findOne({ _id: user_id }, { books: 1, _id: 0 })
    .then((books) => {
      res.status(200).send(books);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).send("not found");
      } else {
        res.status(500).send(e.message);
      }
    });
};

const getUserBook = (req, res) => {
  const { user_id, book_id } = req.params;
  return User.findOne(
    { _id: user_id },
    { books: { $elemMatch: { _id: book_id } }, _id: 0 }
  )
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      if (e.name === "CastError" || e.code === 51270) {
        res.status(404).send("not found");
      } else {
        res.status(500).send(e);
      }
    });
};

const createUser = (req, res) => {
  return User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => res.status(500).send(e.message));
};

const addUserBook = (req, res) => {
  const { user_id } = req.params;
  return User.updateOne({ _id: user_id }, { $push: { books: { ...req.body } } })
    .then(() => {
      res.status(201).send("Success");
    })
    .catch((e) => res.status(500).send(e.message));
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  return User.findByIdAndUpdate(user_id, { ...req.body })
    .then(() => {
      res.status(204).send("Success");
    })
    .catch((e) => res.status(500).send(e.message));
};

const updateUserBook = (req, res) => {
  const { user_id, book_id } = req.params;
  const { title, author, releaseDate } = req.body;
  return User.updateOne(
    { _id: user_id, "books._id": book_id },
    {
      $set: {
        "books.$.title": title,
        "books.$.author": author,
        "books.$.releaseDate": releaseDate,
      },
    }
  )
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((e) => res.status(500).send(e.message));
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  return User.findByIdAndDelete(user_id)
    .then(() => {
      res.status(200).send("Success");
    })
    .catch((e) => res.status(500).send(e.message));
};

const deleteUserBook = (req, res) => {
  const { user_id, book_id } = req.params;
  return User.updateOne(
    { _id: user_id },
    { $pull: { books: { _id: book_id } } }
  )
    .then(() => {
      res.status(200).send("Success");
    })
    .catch((e) => res.status(500).send(e.message));
};

module.exports = {
  getUsers,
  getUser,
  getUserBooks,
  getUserBook,
  createUser,
  addUserBook,
  updateUser,
  updateUserBook,
  deleteUser,
  deleteUserBook,
};
