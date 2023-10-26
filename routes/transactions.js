const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllTransactions(pageSize, page));
});

//Ej 5)
// http://localhost:3000/api/transactions/customerTransactionsByName/Christopher Watson
router.get('/customerTransactionsByName/:name', async (req, res)=>{
    res.json(await controller.getCustomerTransactionsByName(req.params.name));
});

module.exports = router;