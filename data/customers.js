const conn = require("./conn");
const DATABASE = "sample_analytics";
const CUSTOMERS = "customers";
const ACCOUNTS = "accounts";

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

// async function getCustomer(id) {
//   const connectiondb = await conn.getConnection();
//   const customer = await connectiondb
//     .db(DATABASE)
//     .collection(CUSTOMERS)
//     .findOne({ _id: id });
//   return customer;
// }

async function findCustomerByEmail(email) {
  try {
    console.log("buscando cliente con email:", email);

    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .findOne({ email: email });

    if (!customer) {
      console.log("Cliente no encontrado por el mail:", email);
    }
    return customer;
  } catch (error) {
    console.error("error al buscar el cliente por mail:", error);
    throw error;
  }
}

async function getCustomer4accountsOrMore() {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS) // con la expresion gte traigo 4 o mas, con la expresion gt igual
    .find({ $expr: { $gte: [{ $size: "$accounts" }, 4] } })
    .toArray();
  return customer;
}

async function getAccountlimit10000() {
  const connectiondb = await conn.getConnection();
  const accounts = await connectiondb
    .db(DATABASE)
    .collection(ACCOUNTS)
    .find({ limit: 10000 })
    .toArray();
  const idAccounts = accounts.map((account) => account.account_id);
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({ accounts: { $in: idAccounts } })
    .toArray();
  return customer;
}

module.exports = {
  getAllCustomers,
  findCustomerByEmail,
  getCustomer4accountsOrMore,
  getAccountlimit10000,
};
