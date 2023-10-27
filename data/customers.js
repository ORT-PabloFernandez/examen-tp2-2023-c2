const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const { getAccountWithLimit, getAccountId } = require('../data/accounts');
const { getTransaction } = require('../data/transactions');

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

async function getCustomerEmail(email){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({ email });
    console.log('email:', email);
    console.log('customer:', customer);
    return customer;
}

async function getAllCustomersMoraFourAccount(){
    const connectiondb = await conn.getConnection();
    try {
      const customer = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .find({ $expr: { $gte: [{ $size: "$accounts" }, 4] } })
        .toArray();
        console.log('-------customer------------', customer);
      return customer;
    } catch (error) {
      console.error("No hay clinetes con cuatro o más cuentas:", error);
    }
}

async function getAllCustomersAccounWithLimit(){
    const connectiondb = await conn.getConnection();
    const accounts = await getAccountWithLimit();
    const accountsId = accounts.map(account => account.account_id);
    try {
      const customer = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .find({ accounts: { $in: accountsId } })
        .toArray();
        console.log('-------customer account id-------', customer);
      return customer;
    } catch (error) {
      console.error("No hay clinetes con cuentas con límite:", error);
    }
}

async function getCustomerName(name) {
  const connectiondb = await conn.getConnection();
  const customer = await connectiondb
                      .db(DATABASE)
                      .collection(CUSTOMERS)
                      .findOne({ name });
  console.log('name:', name);
  console.log('customer:', customer);
  return customer;
}

async function getNameForAccount(name) {
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(getCustomerName(name)), 1000); // (*)
  }).then(function(result) { // (**)
    console.log('result', result);
    result.accounts.map((account) => getAccountId(account))
    return result
  }).then(function(result) { // (***)
    console.log('acá llega???', getTransaction(result.account_id));
    return getTransaction(result.account_id)
  })
}

module.exports = {
    getAllCustomers,
    getCustomer,
    getCustomerEmail,
    getAllCustomersMoraFourAccount,
    getAllCustomersAccounWithLimit,
    getCustomerName,
    getNameForAccount
};