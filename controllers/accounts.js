const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getAll10kLimitAccounts(){    
    return accounts.getAll10kLimitAccounts();
}

module.exports = {getAllAccounts, getAccount, getAll10kLimitAccounts};