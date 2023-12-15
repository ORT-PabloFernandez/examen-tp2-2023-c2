const express = require("express");
const router = express.Router();
const controller  = require("../controllers/customers");

router.get("/", async (req, res) => {
    const id= req.query.id ? req.query.id : "";
    res.json(await controller.clienteCuenta(id));

});

module.exports = router;