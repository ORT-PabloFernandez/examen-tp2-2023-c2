const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/email/:email', async (req, res) => {
    res.json(await controller.findCustomerByEmail(req.params.email));
});

router.get('/customers-with-accounts', async (req, res) => {
    res.json(await controller.getCustomersWithAccounts());
});

router.get('/customers-with-account-limit-10000', async (req, res) => {
    res.json(await controller.getCustomersWithAccountLimit());
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});

module.exports = router;