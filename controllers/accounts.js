const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccountsGte10k(pageSize, page){    
    return accounts.getAccountsGte10k(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

module.exports = {getAllAccounts, getAccount, getAccountsGte10k};