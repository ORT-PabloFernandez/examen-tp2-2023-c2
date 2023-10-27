const accounts = require('../data/accounts');

async function getAllAccounts(pageSize, page){    
    return accounts.getAllAccounts(pageSize, page);
}

async function getAccountByAccountId(id){
    return accounts.getAccountByAccountId(id);
}

async function getAcountsWithLimit() {
    return accounts.getAcountsWithLimit();
}
async function getAccountByAccountId(account_id) {
    return accounts.getAccountByAccountId(account_id);
}

async function getAccount(id) {
    return accounts.getAccount(id);
}

module.exports = {getAllAccounts, getAcountsWithLimit, getAccountByAccountId, getAccount};