const { User, Thought } = require('../models')

module.exports = {
    // Get all users
    getAllUsers: (req, res) => {
        User.find()
            .select('-__v')
            .then(data => {
                res.json(data);
            })
    },
    // Get a user
    getSingleUser: (req, res) => {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a user
    addSingleUser: (req, res) => {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // Update a user
    updateSingleUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json('User has been updated')
            )
    },
    // Delete a user
    deleteSingleUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany(
                        { username: user.username },
                        { runValidators: true, new: true }
                    )
                    .then(() => res.json('User deleted successfully'))
            })
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend
    addSingleFriend: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.userId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "An error occured: check the user and friend id's" })
                    : res.json('Friend has been added')
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a friend
    deleteSingleFriend: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.body.userId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "An error occured: Check the user and friend id's" })
                    : res.json('Friend has been removed')
            )
            .catch((err) => res.status(500).json(err));
    },
};