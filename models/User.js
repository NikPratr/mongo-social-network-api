const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'This is not a valid email']
    },
    // thoughts: [thoughtSchema],
    // friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// userSchema.virtual('friendCount').get(function() {
//     return this.thoughts.length;
// });

const User = model('user', userSchema);

module.exports = User;