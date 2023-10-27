const accounts = require("../data/accounts");

async function getAllAccounts(pageSize, page) {
  return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id) {
  return accounts.getAccount(id);
}

// Punto 3 - necesitamos conocer las cuentas que tengan un limite de 10.000
async function getAccountWithLimit(lim) {
  return accounts.getAccountWithLimit(lim);
}

module.exports = { getAllAccounts, getAccount, getAccountWithLimit };
