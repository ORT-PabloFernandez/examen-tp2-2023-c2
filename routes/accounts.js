const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');

router.get('/transactions/:account_id', async (req, res, next) => {
    
});

router.get('/accountId/:id', async (req, res, next) => {
    res.json(await controller.getAccountByAccountId(req.params.id));
});

router.get('/limit/:limit', async (req, res, next) => {
    let limit = req.params.limit;
    limit = 10000;
    res.json(await controller.getAccountsByLimit(limit));
});

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllAccounts(pageSize, page));
});

router.get('/:id', async (req, res) => {
    console.log("entro en account id");
    res.json(await controller.getAccount(req.params.id));
});


module.exports = router;