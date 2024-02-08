const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions');

router.get('/account', async (req, res, next) => {
    let account_id = req. query.account_id;
    
});

router.get('/', async (req, res, next) => {
    res.json(await controller.getTransactions());
});

module.exports = router;