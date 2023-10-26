const transactions = require("../data/transactions");

async function getAllTransactions(pageSize, page) {
  return transactions.getAllTransactions(pageSize, page);
}

module.exports = { getAllTransactions };
