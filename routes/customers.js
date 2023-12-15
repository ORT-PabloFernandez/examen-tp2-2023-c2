const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllCustomers(pageSize, page));
});
router.get('/by-account-limit/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit);

    try {
        const customers = await controller.getCustomersByAccountLimit(limit);
        return res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/accounts', async (req, res) => {
    try {
        const customers = await controller.getCustomersWithAtLeast4Accounts();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getCustomer(req.params.id));
});

router.get('/by-email/:email', async (req, res) => {
    try {
        const customer = await controller.getCustomerByEmail(req.params.email);
        if (!customer) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;