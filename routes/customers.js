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

//Ejercicio 1 
router.get('/customerPorEmail/:email', async(req,res) => {
    customer = await controller.findByEmail(req.params.email);
   
    if(customer){
        res.json(customer);
    }else{
        res.status(404).json({message : "Cliente no encontrado"});
    }
});

//Ejercicio 2 , no se solicita ingerseso por parametro
router.get('/custommer-with-min/:accounts', async(req,res) => {
    customer = await controller.getCustomerWithMin4Account(parseInt(req.params.accounts));
   
    if(customer){
        res.json(customer);
    }else{
        //si el array es vacio devuelvo status 404 
        res.status(404).json({message : "Cliente no encontrado"});
    }
});


module.exports = router;