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
            .then(
                (thought) => {
                    return User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $addToSet: { thoughts: thought._id } },
                        { runValidators: true, new: true }
                    )
                })
            .then((user) => res.json(user))
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
    // Delete a thought
    deleteSingleThought: (req, res) => {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json('Thought has been deleted')
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a reaction
    addSingleReaction: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json('Reaction has been added')
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a reaction
    deleteSingleReaction: (req, res) => {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "An error occured: Check the thought and reaction id's" })
                    : res.json('Reaction has been removed')
            )
            .catch((err) => res.status(500).json(err));
    },
}