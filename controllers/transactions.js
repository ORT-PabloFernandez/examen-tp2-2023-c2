const transactions = require("../data/transactions");

async function getAllTransactions(pageSize, page) {
  return customers.getAllTransactions(pageSize, page);
}

async function getTransactionsByAccountId(account_id) {
  return transactions.getTransactionsByAccountId(account_id);
}

module.exports = {
  getAllTransactions,
  getTransactionsByAccountId,
};
