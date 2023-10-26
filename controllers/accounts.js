const accounts = require("../data/accounts");

async function getAllAccounts(pageSize, page) {
  return accounts.getAllAccounts(pageSize, page);
}

async function getAccount10mil() {
  return accounts.getAccount10mil();
}

module.exports = { getAllAccounts, getAccount10mil };
