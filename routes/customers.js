const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/gte4accounts/', async (req, res) => {
    res.json(await controller.getCustomersGte4());
});

router.get('/gte10kAcounts/', async (req, res) => {
    res.json(await controller.getCustomersGte10kAcounts());
});

router.get('/mail/:mail', async (req, res) => {
    res.json(await controller.getCustomerByEmail(req.params.mail));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});


module.exports = router;