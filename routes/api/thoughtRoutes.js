const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController");

// http://localhost:3001/api/thoughts
router.route("/").get(getThoughts);

// http://localhost:3001/api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

// http://localhost:3001/api/thoughts/:userId
router.route("/:userId").post(createThought);

module.exports = router;
