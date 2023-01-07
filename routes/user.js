const router = require('express').Router();

const { deleteUser, getAllUsers } = require('../contollers/users');
const { validateDeleteUser } = require('../middlewares/validation');

router.get('/users', getAllUsers);

router.delete('/users/:_id', validateDeleteUser, deleteUser);

module.exports = router;
