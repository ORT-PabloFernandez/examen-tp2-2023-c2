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

module.exports = {
  getAllCustomers,
  findCustomerByEmail,
  getCustomer4accountsOrMore,
};
