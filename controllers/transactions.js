const transactions = require('../data/transactions');

async function getAllTransactions(pageSize, page){   
    return transactions.getAllTransactions(pageSize, page);
}

async function getTransactionsByCustomerName(customerName){   
    return transactions.getTransactionsByCustomerName(customerName);
}


module.exports = {getAllTransactions,getTransactionsByCustomerName};