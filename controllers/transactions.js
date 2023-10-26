const transactions = require('../data/transactions');

async function getAllTransactions(pageSize, page){    
    return transations.getAllTransactions(pageSize, page);
}

async function getCustomerTransactionsByName(name){
    return transactions.getCustomerTransactionsByName(name);
}

module.exports = 
{
    getAllTransactions, 
    getCustomerTransactionsByName
};