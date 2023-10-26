const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllAccounts(pageSize, page));
});

// esto se lo quize poreguntar asi q lo dejo para cuando lo veamos juntos
// conflicto con URLS request piensa que es un parametro.
router.get('/limit/10000',async (req,res)=>{
    res.json(await controller.getAccountLimit1000())
})

router.get('/:id', async (req, res) => {
    res.json(await controller.getAccount(req.params.id));
});

module.exports = router;