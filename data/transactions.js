const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const TRANSACTIONS = 'transactions';

async function getTransactions() {
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({})
                        .toArray();
    return transactions;
}

module.exports = {
    getTransactions
}