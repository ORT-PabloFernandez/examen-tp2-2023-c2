const conn = require('./conn');
const DATABASE = 'sample_analytics';
const TRANSACTIONS = 'transactions';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';    


async function getAllTransactions(pageSize, page){
    const connectiondb = await conn.getConnection();
    const transactions = await connectiondb
                        .db(DATABASE)
                        .collection(TRANSACTIONS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return transactions;
}

//Ejercicio 5
async function getTransactionsByCustomerName(customerName) {
    const connectiondb = await conn.getConnection();

    // Busco al cliente por su nombre
    const customer = await connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .findOne({ "name": customerName });

    if (!customer) {
        return null; // Si el cliente no se encuentra, devuelve null
    }

    // Obtengo una lista de las cuentas asociadas al cliente
    const customerAccounts = customer.accounts;

    if (customerAccounts.length === 0) {
        return null; // Si el cliente no tiene cuentas, devuelvo null
    }

    // Busco todas las transacciones que tengan un account_id en la lista de accountIds
    const transactions = await connectiondb
      .db(DATABASE)
      .collection(TRANSACTIONS)
      .find({ "account_id": { $in: customerAccounts } })
      .toArray();

    return transactions;
}


module.exports = {
    getAllTransactions, 
    getTransactionsByCustomerName
};