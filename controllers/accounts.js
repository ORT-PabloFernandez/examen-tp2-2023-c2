const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getLimit10000(){
    return accounts.getLimit10000();
}

module.exports = {getAllAccounts, getAccount, getLimit10000};