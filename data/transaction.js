const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const TRANSACTIONS = 'transactions';

async function getTransactionByaccountID(account_id) {
    const connectiondb = await conn.getConnection();
    const account = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .findOne({"account_id": account_id});
    return account;
}

async function getAllTransactions(pageSize, page){
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return transactions;
}

module.exports ={getTransactionByaccountID, getAllTransactions};