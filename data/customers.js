const { ObjectId } = require("mongodb");
const accountController = require("../controllers/accounts");
const transactionController = require("../controllers/transactions");

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
  const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({ email: email });
  return customer;
}

// le puse un parametro solo para ver que sea un poco mas escalable
// el dia que se quiera aumentar la cantidad.
async function getCustomersMinXAccounts(minAccountCount) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({ $expr: { $gte: [{ $size: "$accounts" }, parseInt(minAccountCount)] } })
    .toArray();
  return customer;
}

async function getCustomersWLimit10000() {
  const connectiondb = await conn.getConnection();
  const accounts = await accountController.getAccountLimit1000();
  const idAccounts = accounts.map((account) => account.account_id);
  const customer = await connectiondb
    .db(DATABASE)
    .collection(CUSTOMERS)
    .find({ accounts: { $in: idAccounts } })
    .toArray();
  return customer;
}

async function getCustomerByName(name) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({ name: name });
  return customer;
}

async function getCustomerTransactionsFromAccounts(name) {
  const customer = await getCustomerByName(name);
  const accountsPromises = await customer.accounts.map((account) =>
    accountController.getAccountByAccountID(account)
  );

  const accounts = await Promise.all(accountsPromises);
  const transactionPromises = await accounts.map((account) =>
    transactionController.getTransactionsByAccountId(account.account_id)
  );
  const transactions = await Promise.all(transactionPromises);
  return transactions;
}

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerByEmail,
  getCustomersMinXAccounts,
  getCustomersWLimit10000,
  getCustomerTransactionsFromAccounts
};
