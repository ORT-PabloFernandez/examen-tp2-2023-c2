const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/moreThan4', async (req, res) => {
    res.json(await controller.getCustomersWith4Plus());
});

router.get('/limit10000', async (req, res) => {
    res.json(await controller.getCustomersLimit10000());
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});

router.get('/email/:email', async (req, res) => {
    res.json(await controller.getCustomerByEmail(req.params.email));
});

router.get('/getTransactions/:nombre-:apellido', async (req, res) => {
    res.json(await controller.getAllTransactions(req.params.nombre,req.params.apellido));
});





module.exports = router;