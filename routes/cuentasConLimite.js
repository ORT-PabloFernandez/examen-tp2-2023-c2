const express = require("express");
const router = express.Router();
const controller  = require("../controllers/customers");

router.get("/", async (req, res) => {
    const cuenta= req.query.limite ? req.query.limite : "";
    res.json(await controller.cuentasLimite(limite));

});

module.exports = router;