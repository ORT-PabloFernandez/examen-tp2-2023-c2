const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/account/:limit', async (req, res, next) => {
    let limit = 10000;
    res.json(await controller.getCustomersByAccountsLimit(limit));
});

router.get('/accounts/four', async (req, res, next) => {
    //let quantity = req.params.quant;
    let quantity = 4;
    res.json(await controller.getCustomersByQuantityAccounts(quantity));
});

router.get('/email', async (req, res, next) => {
    let email = req.query.email;
    res.json(await controller.getCustomerByEmail(email));
});

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});


module.exports = router;