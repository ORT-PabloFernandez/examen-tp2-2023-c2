const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const CUSTOMERS = "customers";

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

async function getCustomerByEmail(email) {
  const connectiondb = await conn.getConnection();
  try {
    const customer = await connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .findOne({ email: email });

    if (!customer) {
      throw new Error("Usuario no encontrado");
    }
    return customer;
  } catch (error) {
    console.error(error);
  }
}

async function customersAtLeastFourAccounts() {
  const connectiondb = await conn.getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({ "accounts.length": { $gte: 4 } })
    .toArray();
  return customers;
}

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  customersAtLeastFourAccounts,
};
