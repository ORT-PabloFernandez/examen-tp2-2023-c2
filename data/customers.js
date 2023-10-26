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


async function getCustomerByMail(email){
    const connectiondb = await conn.getConnection();
    const customerByMail = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({email:email});    
    return customerByMail;
}

async function getCustomers4Accounts() {
    const connectiondb= await conn.getConnection();
    try {
        const customer = await connectiondb
                                .db(DATABASE)
                                .collection(CUSTOMERS)
                                .find({
                                    'accounts.3' : {$exists: true}
                                })
                                .toArray();
        
        return customer;
    } catch (error) {
        console.log("Error obteniendo los datos solicitados " , error);
    }
}

async function getCustomersWithAccountLimit(){
    const connectiondb = await conn.getConnection();
    try {
        console.log("Buscando Customers...");

        const customers = await connectiondb
                        .db(DATABASE).collection('accounts')
                        .aggregate([
                            {$match: {limit: 10000}},
                            {$lookup: {
                                from: "customers",
                                localField: "account_id",
                                foreignField: "accounts",
                                as: "acc"
                            }},
                            {$unwind: "$acc"}
                        ])
                        .toArray();

        return customers;
    } catch (error) {
        console.error("No se encontro custumers con accounts de limite 10000:", error);
    }
}




module.exports = {getAllCustomers, getCustomer, getCustomerByMail, getCustomers4Accounts, getCustomersWithAccountLimit};