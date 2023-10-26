const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getAccountLimit10000(){
    return accounts.getAccountLimit10000();
}

async function getAccountByAccountId(account_id) {
    return accounts.getAccountByAccountId(account_id);
}

module.exports = 
{
    getAllAccounts, 
    getAccount, 
    getAccountLimit10000, 
    getAccountByAccountId
};