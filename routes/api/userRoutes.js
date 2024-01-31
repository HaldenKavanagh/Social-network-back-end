const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  putSingleUser,
  deleteSingleUser,
} = require("../../controllers/userController");

// http://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// http://localhost:3001/api/users/:id
router.route("/:userId").get(getSingleUser);
//   .put(putSingleUser)
//   .delete(deleteSingleUser);

// /api/users/:userId/friends/:friendId
// post route to create a reaction stored in a single thought's reaction
// delete route for a reaction based on id

module.exports = router;
