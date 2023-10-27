const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const {getAcountsWithLimit, getAccountByAccountId} = require('../controllers/accounts')
const {getTransactionByaccountID} = require('../controllers/transactions')

async function getAllCustomers(pageSize, page){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return customers;
}

async function getCustomer(id){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({_id:new ObjectId(id)});    
    return customer;
}

async function getCustomerByEmail(email) {
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({ email: email });
    return customer;
  }

async function getClientWithFourAccounts() {
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb.db(DATABASE).collection(CUSTOMERS).find({ $expr: { $gte: [{ $size: "$accounts" }, 4] } }).toArray();
    return customers;
}

async function getCustomersWithLimit() {
    const connectiondb = await conn.getConnection();
    const accounts = await getAcountsWithLimit();
    const accountsIndex = await accounts.map((account=> account.account_id));
    const customers = await connectiondb.db(DATABASE).collection(CUSTOMERS).find({ accounts: { $in: accountsIndex } }).toArray(); 
    return customers;
}


async function getAllChrisTransactions() {
    const chris = await getChris("Christopher Watson");
    const accountsPromises = await chris.accounts.map((account) => getAccountByAccountId(account));
    const accounts = await Promise.all(accountsPromises);
    const transactionsPromises = await accounts.map((account)=> getTransactionByaccountID(account.account_id));
    const transactions = await Promise.all(transactionsPromises);
    return transactions;
  }

  async function getChris(name) {
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({ name: name });
    return customer;
  }

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getClientWithFourAccounts, getCustomersWithLimit, getAllChrisTransactions};