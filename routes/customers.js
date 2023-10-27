const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers");

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllCustomers(pageSize, page));
});

router.get("/:id", async (req, res) => {
  res.json(await controller.getCustomer(req.params.id));
});

// Punto 1 - endpoint que nos devuelva un cliente  (**customer**) particular por email
router.get("/email/:email", async (req, res) => {
  res.json(await controller.getCustomerByEmail(req.params.email));
});

// Punto 2 - endpoint que retorne los clientes que tengan al menos 4 cuentas (**accounts**)
router.get("/naccounts/:acc", async (req, res) => {
  res.json(await controller.getCustomersWithNAccountsOrMore(req.params.acc));
});

// Punto 4 - listado de los clientes que tienen una cuenta con 10.000 de limite
router.get("/nlimite/:lim", async (req, res) => {
  res.json(await controller.getCustomersWithNLimit(req.params.lim));
});

module.exports = router;
