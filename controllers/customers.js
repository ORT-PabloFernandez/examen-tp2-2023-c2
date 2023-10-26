const customers = require("../data/customers");

async function getAllCustomers(pageSize, page) {
  return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id) {
  return customers.getCustomer(id);
}

async function getCustomerByEmail(email) {
  return customers.getCustomerByEmail(email);
}

async function getCustomersMinXAccounts(minAccountCount) {
  return customers.getCustomersMinXAccounts(minAccountCount);
}

async function getCustomersWLimit10000() {
  return customers.getCustomersWLimit10000();
}

async function getCustomerTransactionsFromAccounts(name) {
  return customers.getCustomerTransactionsFromAccounts(name);
}
module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  getCustomersMinXAccounts,
  getCustomersWLimit10000,
  getCustomerTransactionsFromAccounts
};
