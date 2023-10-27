const { ObjectId } = require('mongodb');
const conn = require('./conn');

const DATABASE = 'sample_analytics';
const TRANSACTIONS = 'transactions';
const CUSTOMERS = 'customers';

async function getAllTransactions(pageSize, page){
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return transactions;
}

async function getByAccId(id){
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb.db(DATABASE).collection(TRANSACTIONS).find({account_id: id}).toArray();

    return transactions;
}


module.exports = {getAllTransactions,getByAccId};