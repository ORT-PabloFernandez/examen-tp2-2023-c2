const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const TRANSACTIONS = 'transactions';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';

async function getAllTransactions(pageSize, page){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return accounts;
}

async function getCustomerTransactionsByName(name){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({name})
                        .toArray(); 
    
    const idAccounts = customers.flatMap(customer => customer.accounts);
   
    const transactionsOfAccount = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({account_id:{$in:idAccounts}})
                        .toArray();
    
    return transactionsOfAccount;
}


module.exports = 
{
    getAllTransactions, 
    getCustomerTransactionsByName
};