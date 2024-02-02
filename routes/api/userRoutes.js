const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  putSingleUser,
  deleteSingleUser,
  addFriendToUser,
  deleteFriend,
} = require("../../controllers/userController");

// http://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// http://localhost:3001/api/users/:id
router
  .route("/:userId")
  .get(getSingleUser)
  .put(putSingleUser)
  .delete(deleteSingleUser);

// http://localhost:3001/api/users/:userid/friends/friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriendToUser)
  .delete(deleteFriend);

module.exports = router;
