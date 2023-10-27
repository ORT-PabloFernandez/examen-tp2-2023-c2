const { ObjectId } = require('mongodb');
const conn = require('./conn');
const accountsData = require('./accounts');
const transactionData = require('./transactions');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';

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

async function getCustomerByEmail(email){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({email:email});    
    return customer;
}

async function getCustomersWith4Plus(){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb.db(DATABASE).collection(CUSTOMERS).find({$expr: { $gt:[{$size: '$accounts'},4]}}).toArray();
    return customer;
}

async function getCustomersLimit10000(){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb.db(DATABASE).collection(ACCOUNTS).find({limit:10000}).toArray();

    const accountid = accounts.map(account => account.account_id);
    const customers = await connectiondb.db(DATABASE).collection(CUSTOMERS).find({accounts: {$in: accountid}}).toArray(); 
    return customers;
}

async function getCustomerTransactions(name){
    const connectiondb = await conn.getConnection();
    const customeraccounts = await connectiondb.db(DATABASE).collection(CUSTOMERS).findOne({name:name}).accounts; //busca el array de accounts
    console.log(customeraccounts);
    const transactionsTotal = [];
    customeraccounts.forEach(account => {
        const transactions = transactionData.getByAccId(account);
        transactionsTotal.push(transactions);
    });
    return transactionsTotal;
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWith4Plus,getCustomersLimit10000,getCustomerTransactions};