const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/fouraccount', async (req, res) => {
    res.json(await controller.getAllCustomersMoraFourAccount());
});

router.get('/name_for_account/:name', async (req, res) => {
    res.json(await controller.getNameForAccount(req.params.name));
});

router.get('/limit', async (req, res) => {
    res.json(await controller.getAllCustomersAccounWithLimit());
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});

router.get("/email/:email", async (req, res) => {
    res.json(await controller.getCustomerEmail(req.params.email));
});

router.get("/name/:name", async (req, res) => {
    res.json(await controller.getCustomerName(req.params.name));
});

module.exports = router;