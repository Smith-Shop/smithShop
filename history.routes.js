const express = require('express');
const { getHistory, deleteHistory } = require('../controllers/history.controller');
const router = express.Router();


router.get('/:userId', getHistory);
router.delete('/:orderId', deleteHistory);



module.exports = router;
