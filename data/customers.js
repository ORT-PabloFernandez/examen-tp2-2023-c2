const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';
const controllerAc = require('../controllers/accounts');

async function getAllCustomers(pageSize, page){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return customers;
}

async function getCustomer(id){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({_id:new ObjectId(id)});    
    return customer;
}
async function getCustomerByEmail(email) {
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .findOne({ email: email });
    return customer;
}
async function getCustomersWithAtLeast4Accounts() {
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .aggregate([
            {
                $match: {
                    "accounts": { $exists: true }
                }
            },
            {
                $addFields: {
                    numAccounts: { $size: "$accounts" }
                }
            },
            {
                $match: {
                    numAccounts: { $gte: 4 }
                }
            },
            {
                $project: {
                    numAccounts: 0
                }
            }
        ])
        .toArray();
    return customers;
}
async function getCustomersByAccountIds(accountIds) {
    const connectiondb = await conn.getConnection();

    const formattedAccountIds = accountIds.map(id => {
        return typeof id === 'number' ? id : new ObjectId(id);
    });

    const customers = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .find({ accounts: { $in: formattedAccountIds } })
        .toArray();

    console.log("Customers", customers);

    return customers;
}



async function getCustomersByAccountLimit(limit) {
    try {
        const accounts = await controllerAc.getAccountsByLimit(limit);
        console.log("Accounts", accounts);

        const accountIds = accounts.map(account => account._id);
        console.log("Accounts IDs", accountIds);

        if (accountIds.length === 0) {
            return [];
        }

        const customers = await getCustomersByAccountIds(accountIds);
        console.log("Customers", customers);

        return customers;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener clientes por límite de cuenta');
    }
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWithAtLeast4Accounts, getCustomersByAccountLimit};