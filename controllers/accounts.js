const accounts = require("../data/accounts");

async function getAllAccounts(pageSize, page) {
  return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id) {
  return accounts.getAccount(id);
}

async function getAccountLimit1000() {
  return accounts.getAccountLimit1000();
}
module.exports = { getAllAccounts, getAccount, getAccountLimit1000 };
