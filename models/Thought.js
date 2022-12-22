const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      //TODO: Add Getter to format
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      //TODO: Add Getter to format
      default: Date.now,
      // get: function(date) {
        
      // }
    },
    username: {
        type: String,
        required: true,
        },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// thoughtSchema
//   .virtual('reactionCount')
//   .get(function () {
//     return this.reactions.length;
//   });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
