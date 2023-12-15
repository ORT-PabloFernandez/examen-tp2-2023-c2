const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccount(id){
    return accounts.getAccount(id);
}

async function getAllAccountsByLimit(limit) {
    return await accounts.getAllAccountsByLimit(limit);
   
}



module.exports = {getAllAccounts, getAccount, getAllAccountsByLimit};