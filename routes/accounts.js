const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllAccounts(pageSize, page));
});

//EJ 3)
// http://localhost:3000/api/accounts/accountLimit10000
router.get('/accountLimit10000', async (req,res)=>{
    res.json(await controller.getAccountLimit10000());
});

// Para sacar datos para el EJ 5) 
//http://localhost:3000/api/accounts/accountByAccountId/884849
router.get('/accountByAccountId/:account_id', async (req,res)=>{
    const id = req.params.account_id;
    res.json(await controller.getAccountByAccountId(id));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getAccount(req.params.id));
});



module.exports = router;