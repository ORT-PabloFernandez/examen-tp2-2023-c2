const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const CUSTOMERS = "customers";
const ACCOUNTS = "accounts";

async function getAllCustomers(pageSize, page) {
	try {
		const connectiondb = await conn.getConnection();
		const customers = await connectiondb
			.db(DATABASE)
			.collection(CUSTOMERS)
			.find({})
			.limit(pageSize)
			.skip(pageSize * page)
			.toArray();
		if (customers.length === 0) {
			return { status: 404, data: "Not found customers" };
		} else {
			return customers;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getCustomer(id) {
	try {
		const connectiondb = await conn.getConnection();
		const customer = await connectiondb
			.db(DATABASE)
			.collection(CUSTOMERS)
			.findOne({ _id: new ObjectId(id) });
		if (customer === null) {
			return { status: 404, data: "Customer not found" };
		} else {
			return customer;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getCustomerByEmail(email) {
	try {
		const connectiondb = await conn.getConnection();
		const customer = await connectiondb
			.db(DATABASE)
			.collection(CUSTOMERS)
			.findOne({ email: email });
		if (customer === null) {
			return { status: 404, data: "Customer not found" };
		} else {
			return customer;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getCustomersGte4() {
	try {
		const connectiondb = await conn.getConnection();
		const customers = await connectiondb
			.db(DATABASE)
			.collection(CUSTOMERS)
			.find({
				$expr: { $gte: [{ $size: "$accounts" }, 4] },
			})
			.toArray();
		if (customers.length === 0) {
			return { status: 404, data: "Not found customers con mas de 4 accounts" };
		} else {
			return customers;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

async function getCustomersGte10kAcount() {
	try {
		const connectiondb = await conn.getConnection();
		const customers = await connectiondb
			.db(DATABASE)
			.collection(CUSTOMERS)
			.aggregate([
				{
					$lookup: {
						from: ACCOUNTS,
						localField: "accounts",
						foreignField: "account_id",
						as: "accountData",
					},
				},
				{
					$unwind: "$accountData",
				},
				{
					$match: {
						$and: [
							{ "accountData.limit": { $gte: 10000 } },
							{ $expr: { $eq: [{ $size: "$accounts" }, 1] } },
						],
					},
				},
				{
					$group: {
						_id: "$_id",
						customerData: { $first: "$$ROOT" },
					},
				},
				{
					$replaceRoot: { newRoot: "$customerData" },
				},
			])
			.toArray();

		if (customers.length === 0) {
			return {
				status: 404,
				data: "Not found customers con cuentas de 10000 como limite",
			};
		} else {
			return customers;
		}
	} catch (error) {
		return { status: 500, data: "Error" + error };
	}
}

module.exports = {
	getAllCustomers,
	getCustomer,
	getCustomerByEmail,
	getCustomersGte4,
	getCustomersGte10kAcount,
};
