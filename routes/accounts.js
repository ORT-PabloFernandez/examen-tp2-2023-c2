const express = require("express");
const router = express.Router();
const controller = require("../controllers/accounts");

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllAccounts(pageSize, page));
});

router.get("/:id", async (req, res) => {
  res.json(await controller.getAccount(req.params.id));
});

/* Trae aquellas cuentas que tengan Limite 10.000 */
router.get("/account-by-limit/:limite", async (req, res) => {
  res.json(await controller.getAccountByLimit(req.params.limite));
});

/* Trae y lista aquellos id de cuentas que tengan Limite 10.000 */
router.get("/account-by-limit-id/:limite", async (req, res) => {
  res.json(await controller.getAccountIdByLimit(req.params.limite));
});

module.exports = router;
