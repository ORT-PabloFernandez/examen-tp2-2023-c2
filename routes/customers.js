const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});

// router.get('/:id', async (req, res) => {
//     res.json(await controller.getCustomer(req.params.id));
// });
router.get('/fouraccounts', async (req, res) => {
    const accounts = 4
    res.json(await controller.getCustomersFourAccounts(accounts));
});

router.get('/:email', async (req, res) => {
    res.json(await controller.getCustomerByEmail(req.params.email));
});



module.exports = router;