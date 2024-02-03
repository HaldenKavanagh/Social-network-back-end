const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    const { userId } = req.params;
    const { thoughtText, username } = req.body;
    try {
      const thought = await Thought.create({
        thoughtText: thoughtText,
        username: username,
      });

      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        await Thought.findByIdAndDelete(thought._id);
        return res.status(404).json({ message: "User not found" });
      }

      res.status(201).json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async putSingleThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteSingleThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      console.log(reactionBody);
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      console.log("thought is validated");
      if (!reactionBody) {
        return res.status(400).json({ message: "Reaction body is required" });
      }
      thought.reactions.push({ reactionBody, username });
      const updatedThought = await thought.save();

      res.status(201).json(updatedThought);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      console.log("Before removal:", thought.reactions);

      const reactionObjectId = new ObjectId(reactionId);

      const thoughtReactionIds = thought.reactions.map((reaction) =>
        reaction._id.toString().trim()
      );

      console.log(thoughtReactionIds);
      console.log(reactionObjectId.toString());
      if (thoughtReactionIds.includes(reactionObjectId.toString())) {
        thought.reactions.pull(reactionObjectId);
        await thought.save();

        console.log("After removal:", thought.reactions);

        return res
          .status(200)
          .json({ message: "Reaction removed successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Reaction not found in thought's reaction list" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
