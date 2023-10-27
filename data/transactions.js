const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const TRANSACTION = 'transactions';

async function getAllTransaction(pageSize, page){
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTION)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return transactions;
}

async function getTransaction(id){
    const connectiondb = await conn.getConnection();
    const transaction = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTION)
                        .findOne({account_id: id});    
    return transaction;
}

module.exports = {
    getAllTransaction,
    getTransaction
};