const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const TRANSACTIONS = "transactions";
const CUSTOMERS = "customers";
const ACCOUNTS = "accounts";

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

async function getAllTransactionsByName(name) {
	const connectiondb = await conn.getConnection();
	const pipeline = [
		{
			$lookup: {
				from: "customers",
				localField: "account_id",
				foreignField: "accounts",
				as: "customerInfo",
			},
		},
		{
			$unwind: "$customerInfo",
		},
		{
			$match: {
				"customerInfo.name": name,
			},
		},
		{
			$lookup: {
				from: "accounts",
				localField: "account_id",
				foreignField: "account_id",
				as: "customerAccounts",
			},
		},
		{
			$group: {
				_id: "$customerInfo._id",
				name: { $first: "$customerInfo.name" },
				transactions: { $push: "$$ROOT" },
			},
		},
	];

	const transactions = await connectiondb
		.db(DATABASE)
		.collection(TRANSACTIONS)
		.aggregate(pipeline)
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
	getAllTransactionsByName,
};
