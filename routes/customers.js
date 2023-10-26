const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});


// Punto nro 1 del exámen
router.get('/email/:email', async (req, res) => {
    res.json(await controller.getCustomerByMail(req.params.email));
})

// Punto nro 2 del exámen
router.get('/customers-four-accounts', async (req, res) => {
    res.json(await controller.getCustomers4Accounts());
})


// Punto nro 4 del exámen

router.get('/customers-limit', async (req, res) => {
    res.json(await controller.getCustomersWithAccountLimit());
})



router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});






module.exports = router;