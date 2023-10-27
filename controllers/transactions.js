const transactions = require('../data/transaction');

async function getTransactionByaccountID(id){    
    return transactions.getTransactionByaccountID(id);
}

async function getAllTransactions(pageSize, page){    
    return transactions.getAllTransactions(pageSize, page);
}

module.exports = {getTransactionByaccountID, getAllTransactions};