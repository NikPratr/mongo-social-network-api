const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    addSingleUser,
    updateSingleUser,
    deleteSingleUser
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(addSingleUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateSingleUser)
    .delete(deleteSingleUser);

module.exports = router;