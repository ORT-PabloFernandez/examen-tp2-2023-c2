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

//ejercicio 3
//De la otra collectios accounts necesitamos conocer las cuentas que tengan un limite de 10.000
async function getAccountsWithLimit(){
    try{
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .find({limit: 10000}).toArray();    
    return accounts;
    }catch(error){
        console.error("Error al buscar cuentas con limite de 10k.", error);
    }
}

module.exports = {getAllAccounts, getAccount, getAccountsWithLimit};