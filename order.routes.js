const express = require('express');
const { addOrder, getOrder } = require('../controllers/order.controller');
const router = express.Router();


router.get('/', getOrder);
//router.get('/', getHistory);
router.post('/', addOrder);





module.exports = router;
