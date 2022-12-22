const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    addSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addSingleFriend,
    deleteSingleFriend
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

// /api/users/friends/:userId
router.route('/friends/:userId')
    .put(addSingleFriend)
    .delete(deleteSingleFriend);

module.exports = router;