const transactions = require('../data/transactions');

async function getAllTransactions(pageSize, page){    
    return transactions.getAllTransactions(pageSize, page);
}

async function getTransaction(id){
    return transactions.getTransaction(id);
}

module.exports = {getAllTransactions, getTransaction};