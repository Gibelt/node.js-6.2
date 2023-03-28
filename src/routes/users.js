const router = require("express").Router();

const {
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
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:user_id", getUser);
router.get("/users/:user_id/books", getUserBooks);
router.get("/users/:user_id/books/:book_id", getUserBook);

router.post("/users", createUser);
router.post("/users/:user_id/books", addUserBook);

router.patch("/users/:user_id", updateUser);
router.patch("/users/:user_id/books/:book_id", updateUserBook);

router.delete("/users/:user_id", deleteUser);
router.delete("/users/:user_id/books/:book_id", deleteUserBook);

router.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
});

module.exports = router;
