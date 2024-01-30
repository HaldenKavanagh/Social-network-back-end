const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,

      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to retrieve the reaction count

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// getter function to format the date time

thoughtSchema.path("createdAt").get(function (value) {
  return value.toLocaleString();
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
