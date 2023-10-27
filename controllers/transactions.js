const transactions = require("../data/transactions");

async function getAllTransactions(name, pageSize, page) {
	return transactions.getAllTransactions(name, pageSize, page);
}

async function getTransaction(id) {
	return transactions.getTransaction(id);
}

async function getAllTransactionsByName(name) {
	return transactions.getAllTransactionsByName(name);
}

module.exports = {
	getAllTransactions,
	getTransaction,
	getAllTransactionsByName,
};
