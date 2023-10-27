const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const ACCOUNTS = "accounts";

async function getAllAccounts(pageSize, page) {
	try {
		const connectiondb = await conn.getConnection();
		const accounts = await connectiondb
			.db(DATABASE)
			.collection(ACCOUNTS)
			.find({})
			.limit(pageSize)
			.skip(pageSize * page)
			.toArray();
		if (accounts.length === 0) {
			return { status: 404, data: "Not found accounts" };
		} else {
			return accounts;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getAccountsGte10k(pageSize, page) {
	try {
		const connectiondb = await conn.getConnection();
		const accounts = await connectiondb
			.db(DATABASE)
			.collection(ACCOUNTS)
			.find({
				limit: { $gte: 10000 },
			})
			.limit(pageSize)
			.skip(pageSize * page)
			.toArray();
		if (accounts.length === 0) {
			return {
				status: 404,
				data: "Not found accounts con limit mayor a 10000",
			};
		} else {
			return accounts;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getAccount(id) {
	try {
		const connectiondb = await conn.getConnection();
		const account = await connectiondb
			.db(DATABASE)
			.collection(ACCOUNTS)
			.findOne({ _id: new ObjectId(id) });
            if (account === null) {
                return {
                    status: 404,
                    data: "Account not found",
                };
            } else {
                return account;
            }
		
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

module.exports = { getAllAccounts, getAccount, getAccountsGte10k };
