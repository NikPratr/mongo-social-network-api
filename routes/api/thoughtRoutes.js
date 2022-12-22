const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    addSingleThought,
    updateSingleThought,
    deleteSingleThought,
    addSingleReaction,
    deleteSingleReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addSingleThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .delete(deleteSingleThought);

router.route('/reactions/:thoughtId')
    .post(addSingleReaction)
    .delete(deleteSingleReaction);

module.exports = router;