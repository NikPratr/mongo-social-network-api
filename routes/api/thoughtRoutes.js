const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    addSingleThought,
    updateThoughtsArray,
    updateSingleThought,
    deleteSingleThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(updateThoughtsArray);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .delete(deleteSingleThought);

module.exports = router;