const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccounts(){    
    return accounts.getAccounts();
}

async function getAccount(id){
    return accounts.getAccount(id);
}

module.exports = {getAllAccounts, getAccount, getAccounts};