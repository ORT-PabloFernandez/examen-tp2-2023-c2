const transactions = require('../data/transactions');

async function getAllTransactions(pageSize, page){
    return transactions.getAllTransactions(pageSize, page);
}

async function getByAccId(id){
    return transactions.getByAccId(id);
}

module.exports= {getAllTransactions,getByAccId};