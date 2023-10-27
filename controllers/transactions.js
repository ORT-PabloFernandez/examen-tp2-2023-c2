const transaction = require('../data/transactions');

async function getAllTransaction(pageSize, page){    
    return transaction.getAllTransaction(pageSize, page);
}

async function getTransaction(id){
    return transaction.getTransaction(id);
}

module.exports = {
    getAllTransaction,
    getTransaction
};