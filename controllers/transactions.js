const transactions = require('../data/transactions');

async function getTransactions() {
    return transactions.getTransactions();
}

module.exports = {
    getTransactions
}