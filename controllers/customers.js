const customers = require("../data/customers");

async function getAllCustomers(pageSize, page) {
  return customers.getAllCustomers(pageSize, page);
}

async function findCustomerByEmail(email) {
  return customers.findCustomerByEmail(email);
}

async function getCustomer4accountsOrMore() {
  return customers.getCustomer4accountsOrMore();
}

async function getAccountlimit10000() {
  return customers.getAccountlimit10000();
}

async function getCustomerTransactionsFromAccounts(name) {
  return customers.getCustomerTransactionsFromAccounts(name);
}

module.exports = {
  getAllCustomers,
  findCustomerByEmail,
  getCustomer4accountsOrMore,
  getAccountlimit10000,
  getCustomerTransactionsFromAccounts,
};
