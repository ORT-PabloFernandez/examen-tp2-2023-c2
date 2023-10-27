const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getAccountWithLimit(){
    return accounts.getAccountWithLimit();
}

async function getAccountId(account_id){
    return accounts.getAccountId(account_id);
}

module.exports = {getAllAccounts, getAccount, getAccountWithLimit, getAccountId};