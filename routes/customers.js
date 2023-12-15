const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});

router.get('/byEmail/:email', async (req, res) => {
    res.json(await controller.getCustomerByEmail(req.params.email));
       
        
});

router.get('/withFourOrMoreAccounts', async (req, res) => {
    res.json(await controller.getCustomersWithFourOrMoreAccounts());

});


router.get('/highLimitCustomers/:limit', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit): 10000;
    res.json(await controller.getCustomersWithHighLimit(limit));
     });





module.exports = router;