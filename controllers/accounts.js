const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getAccountLimit(number){
    return accounts.getAccountLimit(number);
}

module.exports = {getAllAccounts, getAccount, getAccountLimit};