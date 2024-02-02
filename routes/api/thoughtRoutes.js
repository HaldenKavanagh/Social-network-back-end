const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  putSingleThought,
  deleteSingleThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// http://localhost:3001/api/thoughts
router.route("/").get(getThoughts);

// http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(putSingleThought)
  .delete(deleteSingleThought);

// http://localhost:3001/api/thoughts/:userId
router.route("/:userId").post(createThought);

// http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
