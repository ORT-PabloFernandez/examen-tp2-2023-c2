const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomerById(req.params.id));
});


//ENDPOINT
//1. Obtener cliente por mail
router.get('/:email', async (req, res) => {
    console.log(req.params.email);
    res.json(await controller.getCustomerByEmail(req.params.email));
});

//1. Obtener cliente con al menos 4 cuentas
router.get('/', async (req, res) => {
    res.json(await controller.getCustomersFourAccounts())
});



module.exports = router;