const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const TRANSACTIONS = "transactions";
const CUSTOMERS = "customers";
const ACCOUNTS = "accounts";

async function getAllTransactions(pageSize, page) {
	try {
		const connectiondb = await conn.getConnection();
		const transactions = await connectiondb
			.db(DATABASE)
			.collection(TRANSACTIONS)
			.find({})
			.limit(pageSize)
			.skip(pageSize * page)
			.toArray();
		if (transactions.length === 0) {
			return { status: 404, data: "Not found transactions" };
		} else {
			return transactions;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getAllTransactionsByName(name) {
	try {
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

		if (transactions.length === 0) {
			return { status: 404, data: "Not found transactions" };
		} else {
			return transactions;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getTransaction(id) {
	try {
		const connectiondb = await conn.getConnection();
		const transaction = await connectiondb
			.db(DATABASE)
			.collection(TRANSACTIONS)
			.findOne({ _id: new ObjectId(id) });
		if (transaction === null) {
			return {
				status: 404,
				data: "transaction not found",
			};
		} else {
			return transaction;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

module.exports = {
	getAllTransactions,
	getTransaction,
	getAllTransactionsByName,
};
