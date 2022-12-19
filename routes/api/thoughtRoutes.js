const router = require('express').Router();
const {
    getAllThoughts,
    addSingleThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addSingleThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')

module.exports = router;