const customers = require("../data/customers");

async function getAllCustomers(pageSize, page) {
  return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id) {
  return customers.getCustomer(id);
}

// Punto 1 - endpoint que nos devuelva un cliente  (**customer**) particular por email
async function getCustomerByEmail(email) {
  return customers.getCustomerByEmail(email);
}

// Punto 2 - endpoint que retorne los clientes que tengan al menos 4 cuentas (**accounts**)
async function getCustomersWithNAccountsOrMore(acc) {
  return customers.getCustomersWithNAccountsOrMore(acc);
}

// Punto 4 - listado de los clientes que tienen una cuenta con 10.000 de limite
async function getCustomersWithNLimit(lim) {
  return customers.getCustomersWithNLimit(lim);
}

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  getCustomersWithNAccountsOrMore,
  getCustomersWithNLimit,
};
