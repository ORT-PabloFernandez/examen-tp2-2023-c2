const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_analytics";
const CUSTOMERS = "customers";

async function getAllCustomers(pageSize, page) {
	const connectiondb = await conn.getConnection();
	const customers = await connectiondb
		.db(DATABASE)
		.collection(CUSTOMERS)
		.find({})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return customers;
}

async function getCustomer(id) {
	const connectiondb = await conn.getConnection();
	const customer = await connectiondb
		.db(DATABASE)
		.collection(CUSTOMERS)
		.findOne({ _id: new ObjectId(id) });
	return customer;
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

module.exports = {
	getAllCustomers,
	getCustomer,
	getCustomerByEmail,
	getCustomersGte4,
};
