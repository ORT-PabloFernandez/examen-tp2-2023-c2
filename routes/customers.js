const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});
//Ej 1) 
// http://localhost:3000/api/customers/customerByEmail/david45@yahoo.com
router.get('/customerByEmail/:email', async (req, res) =>{
    res.json(await controller.getCustomerByEmail(req.params.email));
});

//Ej 2)
// http://localhost:3000/api/customers/customer4AccountsOrMore/
router.get('/customer4AccountsOrMore/', async (req, res) =>{
    res.json(await controller.getCustomer4AccountsOrMore());
});

//Ej 4)
// http://localhost:3000/api/customers/customersAccountLimit10000/
router.get('/customersAccountLimit10000/', async (req, res)=>{
    res.json(await controller.getCustomersAccountLimit10000());
});

// Para sacar datos para el EJ 5) 
//http://localhost:3000/api/customers/customersByName/Christopher Watson
router.get('/customersByName/:name', async (req, res)=>{
    res.json(await controller.getCustomersByName(req.params.name));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});


module.exports = router;