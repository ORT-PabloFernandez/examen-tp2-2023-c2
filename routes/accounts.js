const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllAccounts(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getAccount(req.params.id));
});

//Ejercicio 3 , no se solicita ingerseso por parametro
router.get('/Account-with-limit/:limit', async(req,res) => {
    accounts = await controller.getAccountWithLimit(req.params.limit);
   
    if(accounts){
        res.json(accounts);
    }else{
        //si el array es vacio devuelvo status 404 
        res.status(404).json({message : "Ninguna cuenta tiene este limite"});
    }
});

module.exports = router;