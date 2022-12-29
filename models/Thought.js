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
      default: Date.now,
      get: formatDate
    },
  },
  {
    _id: false,
  },
  {
    toJSON: {
      getters: true,
    }
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
      default: Date.now,
      get: formatDate
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
      getters: true,
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

function formatDate(date) {
    return date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"});
  };

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
