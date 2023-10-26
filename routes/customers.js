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

//Ejercicio 2 , 
router.get('/custommer-with-min/:accounts', async(req,res) => {
    customers = await controller.getCustomerWithMin4Account(parseInt(req.params.accounts));
   
    if(customers){
        res.json(customers);
    }else{
        //si el array es vacio devuelvo status 404 
        res.status(404).json({message : "Cliente no encontrado"});
    }
});

//Ejercicio 4  Parametrizo para  luego si quiere buscar otra cantidad de clientes con otro limite
router.get('/customers-with-account-limit/:limit', async (req, res) => {
    const customers = await controller.getCustomersWithAccountLimit(parseInt(req.params.limit));

    if (customers) {
        res.json(customers);
    } else {
        res.status(404).json({ message: "Clientes no encontrados" });
    }
});


module.exports = router;