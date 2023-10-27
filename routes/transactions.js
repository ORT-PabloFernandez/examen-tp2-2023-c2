const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllTransactions(pageSize, page));
});

router.get('/transactions-by-customer/:customerName', async (req, res) => {
    const customerName = req.params.customerName;
    const transactions = await controller.getTransactionsByCustomerName(customerName);

    if (transactions) {
        res.json(transactions);
    } else {
        res.status(404).json({ message: "No se encontraron transacciones para el cliente" });
    }
});


module.exports = router;