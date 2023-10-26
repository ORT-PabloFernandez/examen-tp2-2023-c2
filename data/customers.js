const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';

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

async function findCustomerByEmail(email){
    try {
        console.log("Buscando cliente con email:", email);

        const connectiondb = await conn.getConnection();
        if (!connectiondb) {
            console.error("No se pudo establecer una conexión con la base de datos");
            return null;
        }

        const customer = await connectiondb
            .db(DATABASE)
            .collection(CUSTOMERS)
            .findOne({ email: email });

        if (!customer) {
            console.log("Cliente no encontrado para el email:", email); 
        }

        return customer;

    } catch (error) {
        console.error("Error al buscar el cliente por email:", error);
        throw error;
    }
}

async function getCustomersWithAccounts(){
    const connectiondb = await conn.getConnection();
    try {
        const customers = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .find({
        'accounts.3': {$exists: true}
        })
        .toArray();

        return customers;
    } catch (error) {
        console.error("No se encontro custumers con accounts:", error);
    }
}

async function getCustomersWithAccountLimit(){
    const connectiondb = await conn.getConnection();
    try {
        console.log("Buscando Customers...");

        const customers2 = await connectiondb.db(DATABASE).collection('accounts')
            .aggregate([
                {$match: {limit: 10000}},
                {$lookup: {
                    from: "customers",
                    localField: "account_id",
                    foreignField: "accounts",
                    as: "acc"
                }},
                {$unwind: "$acc"}
            ]).toArray()

        return customers2;
    } catch (error) {   
        console.error("No se encontro custumers con accounts de limite 10000:", error);
    }
}

module.exports = {getAllCustomers, getCustomer, findCustomerByEmail, getCustomersWithAccounts, getCustomersWithAccountLimit};