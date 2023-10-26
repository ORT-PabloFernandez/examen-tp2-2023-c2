const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllAccounts(pageSize, page));
});

router.get('/getAccountsGte10k', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAccountsGte10k(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getAccount(req.params.id));
});


module.exports = router;