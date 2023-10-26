const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const TRANSACTIONS = "transactions";

async function getAllTransactions(pageSize, page) {
	const connectiondb = await conn.getConnection();
	const transactions = await connectiondb
		.db(DATABASE)
		.collection(TRANSACTIONS)
		.find({})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return transactions;
}

async function getTransaction(id) {
	const connectiondb = await conn.getConnection();
	const transaction = await connectiondb
		.db(DATABASE)
		.collection(TRANSACTIONS)
		.findOne({ _id: new ObjectId(id) });
	return transaction;
}

module.exports = {
	getAllTransactions,
	getTransaction,
};
