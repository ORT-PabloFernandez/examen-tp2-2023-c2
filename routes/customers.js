const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

//ejercicio 1
router.get('/email/:email', async (req, res) =>{
    res.json(await controller.getCustomerByEmail(req.params.email));
})

//ejercicio 2
router.get('/customers-4-acc', async (req, res) =>{
    res.json(await controller.getCustomersWith4Acc());
})

//ejercicio 4
router.get('/customers-acc-limited', async (req, res) =>{
    res.json(await controller.getCustomersWithAccLimited());
})

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});


module.exports = router;