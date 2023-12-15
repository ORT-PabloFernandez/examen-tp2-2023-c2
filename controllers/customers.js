const customers = require("../data/customers");

async function getAllCustomers(pageSize, page) {
  return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id) {
  return customers.getCustomer(id);
}

async function getCustomerPorEmail(email) {
  return customers.getCustomerPorEmail(email);
}

async function getMayorACuatroCuentas(nro) {
  return customers.getMayorACuatroCuentas(nro);
}

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerPorEmail,
  getMayorACuatroCuentas,
};
