const { Thought, User } = require('../models')

// wow, what a file name
module.exports = {
    // Get all thoughts
    getAllThoughts: (req, res) => {
        Thought.find()
            .select('-__v')
            .then(data => {
                res.json(data);
            })
    },
    // Get a thought
    getSingleThought: (req, res) => {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a thought
    addSingleThought: (req, res) => {
        console.log("Adding thought");
        console.log(req.body);
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // Add new thought to user's thoughts array
    updateThoughtsArray: (req, res) => {
        console.log("Updating thoughts");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: req.userId } },
            { runValidators: true, new: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // Update a thought
    updateSingleThought: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json('Thought has been updated')
            )
    },
    // Delete a user
    deleteSingleThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json('Thought has been deleted')
            )
            .catch((err) => res.status(500).json(err));
    }
}