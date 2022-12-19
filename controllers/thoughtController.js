const { Thought } = require('../models')

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
    // Add a thought
    addSingleThought: (req, res) => {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
}