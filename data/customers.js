const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const CUSTOMERS = "customers";
const { getAccountWithLimit } = require("../controllers/accounts");

async function getAllCustomers(pageSize, page) {
  const connectiondb = await conn.getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return customers;
}

async function getCustomer(id) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .findOne({ _id: new ObjectId(id) });
  return customer;
}

// Punto 1 - endpoint que nos devuelva un cliente  (**customer**) particular por email
async function getCustomerByEmail(email) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .findOne({ email: email });

  return customer;
}

// Punto 2 - endpoint que retorne los clientes que tengan al menos 4 cuentas (**accounts**)
async function getCustomersWithNAccountsOrMore(accMin) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({
      $expr: { $gte: [{ $size: "$accounts" }, parseInt(accMin)] },
    })
    .toArray();
  return customer;
}

// Punto 4 - listado de los clientes que tienen una cuenta con 10.000 de limite
async function getCustomersWithNLimit(lim) {
  const connectiondb = await conn.getConnection();
  const accountsConLimite = await getAccountWithLimit(lim);
  const idAccountsConLimite = await accountsConLimite.map(
    (account) => account.account_id
  );
  const customers = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({
      accounts: { $in: idAccountsConLimite },
    })
    .toArray();
  return customers;
}

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  getCustomersWithNAccountsOrMore,
  getCustomersWithNLimit,
};
