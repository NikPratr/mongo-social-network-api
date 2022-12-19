const { User } = require('../models')

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
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json('User has been deleted')
            )
            .catch((err) => res.status(500).json(err));
    },
};