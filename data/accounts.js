const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const ACCOUNTS = 'accounts';

async function getAllAccounts(pageSize, page){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return accounts;
}

async function getAccount(id){
    const connectiondb = await conn.getConnection();

    let idConv = parseInt(id)
    const account = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .findOne({account_id: idConv}); 
    return account;
}

async function getAccountsLimite(){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .find({limit: 10000})
                        .toArray();    
    return accounts;
}



module.exports = {getAllAccounts, getAccount, getAccountsLimite};