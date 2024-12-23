const express = require('express');
const { addUser, getUser, editUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();


//partie orders
router.get('/', getUser);

router.post('/', addUser);

router.put('/:id', editUser);

router.delete('/:id', deleteUser);



module.exports = router;
