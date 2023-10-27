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
    const account = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .findOne({_id:new ObjectId(id)});    
    return account;
}

async function getAccountWithLimit(limite) {
    limite = parseInt(limite); //Parseo el limite 
 

    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
      .db(DATABASE)
      .collection(ACCOUNTS)
      .find({
        "limit": limite
      })
      .toArray();

    //Si account lengh es 0 devuelvo null para controlor status code 
    if (accounts.length === 0) {
        return null;
    }

    return accounts;
}

module.exports = {
  getAllAccounts, 
  getAccount,
  getAccountWithLimit
};