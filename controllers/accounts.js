const accounts = require("../data/accounts");

async function getAllAccounts(pageSize, page) {
  return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id) {
  return accounts.getAccount(id);
}

async function getAccountByLimit(limite) {
  return accounts.getAccountByLimit(limite);
}

async function getAccountIdByLimit(limite) {
  return accounts.getAccountIdByLimit(limite);
}

module.exports = {
  getAllAccounts,
  getAccount,
  getAccountByLimit,
  getAccountIdByLimit,
};
