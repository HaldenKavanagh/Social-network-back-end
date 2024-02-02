const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async putSingleUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteSingleUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: "User and associated apps deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriendToUser(req, res) {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found" });
      }

      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();

        return res.status(200).json({ message: "Friend added successfully" });
      } else {
        return res.status(400).json({ message: "Friend already added" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("Before removal:", user.friends);

      const friendObjectId = new ObjectId(friendId);
      console.log(friendObjectId);

      // Convert ObjectId from objects to strings in order to make comparison
      const userFriendIds = user.friends.map((friend) => friend.toString());

      if (userFriendIds.includes(friendObjectId.toString())) {
        user.friends.pull(friendObjectId);
        await user.save();

        console.log("After removal:", user.friends);

        return res.status(200).json({ message: "Friend removed successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Friend not found in user's friends list" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
