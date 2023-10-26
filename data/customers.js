const { ObjectId } = require('mongodb');
const conn = require('./conn');
const accounts = require('./accounts');
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

async function getCustomers(){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({})
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

async function getCustomerEmail(emailParam){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({email:emailParam});    
    return customer;
}

async function getCustomerFourAccounts(){
    let customersArray = []

    customersArray = await getCustomers();

    const datos = []

    for (let index = 0; index < customersArray.length; index++) {
        let customer = customersArray[index];
        
        if (customer.accounts.length >= 4) {
            datos.push(customer)
        }
    }

    return datos
}

async function getCustomerLimit(){
    const connectiondb = await conn.getConnection();
    const cuentas = await accounts.getAccountsLimite();
    const idCuentas = cuentas.map((cuenta) => cuenta.account_id)
    const clientes = await connectiondb
                            .db(DATABASE)
                            .collection(CUSTOMERS)
                            .find({ accounts : { $in: idCuentas}})
                            .toArray()

    return clientes

}


module.exports = {getAllCustomers, getCustomer, getCustomerEmail, getCustomerFourAccounts, getCustomerLimit};