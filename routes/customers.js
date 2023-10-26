const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');


router.get('/email/:email', async (req, res) => {
    res.json(await controller.getCustomerEmail(req.params.email));
});

router.get('/getfour', async (req, res) => {
    res.json(await controller.getCustomerFourAccounts());
});

router.get('/clientelimit', async (req, res) => {
    res.json(await controller.getCustomerLimit());
});


router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});




 router.get('/:id', async (req, res) => {
    console.log("id")
     res.json(await controller.getCustomer(req.params.id));
 });

 

module.exports = router;