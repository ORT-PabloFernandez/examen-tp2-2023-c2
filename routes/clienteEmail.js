const express = require("express");
const router = express.Router();
const controller  = require("../controllers/customers");

router.get("/", async (req, res) => {
    const email= req.query.email ? req.query.email : "";
    res.json(await controller.clienteEmail(email));

});

module.exports = router;