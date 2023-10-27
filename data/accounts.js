const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const ACCOUNTS = "accounts";

async function getAllAccounts(pageSize, page) {
  const connectiondb = await conn.getConnection();
  const accounts = await connectiondb
    .db(DATABASE)
    .collection(ACCOUNTS)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return accounts;
}

async function getAccount(id) {
  const connectiondb = await conn.getConnection();
  const account = await connectiondb
    .db(DATABASE)
    .collection(ACCOUNTS)
    .findOne({ _id: new ObjectId(id) });
  return account;
}

// Punto 3 - necesitamos conocer las cuentas que tengan un limite de 10.000
async function getAccountWithLimit(lim) {
  const connectiondb = await conn.getConnection();
  const accounts = await connectiondb
    .db(DATABASE)
    .collection(ACCOUNTS)
    .find({ limit: parseInt(lim) })
    .toArray();
  return accounts;
}

module.exports = { getAllAccounts, getAccount, getAccountWithLimit };
