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


//ejercicio 1
//Necesitamos un endpoint que nos devuelva un cliente (customer) particular por email
async function getCustomerByEmail(email){
    try{
        console.log("Buscando cliente con email: ", email);
        const connectiondb = await conn.getConnection();
        if(!connectiondb){
            console.error('Error, no se pudo establecer conexion con la base de datos');
            return null;
        }
        const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({email: email});    
        if(!customer) console.log("Error, cliente no encontrado.");                
        return customer;
    }catch(error){
        console.error("Error al buscar el cliente.", error);
        throw error
    }
}

//ejercicio 2
//Necesitamos un endpoint que retorne los clientes que tengan al menos 4 cuentas (accounts)
async function getCustomersWith4Acc(){
    const connectiondb = await conn.getConnection();
    try{
        const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({
                            'accounts.3': {$exists: true}
                        }).toArray();    
        return customer;
    }catch(error){
        console.error("Error al buscar clientes con 4 cuentas o mas.", error);
    }
}

//ejercicio 4
//Necesitamos un listado de los clientes que tienen una cuenta con 10.000 de limite
async function getCustomersWithAccLimited(){
    const connectiondb = await conn.getConnection();
    try{
        console.log('Buscando')
        const customersAux = await connectiondb.db(DATABASE).collection('accounts')
            .aggregate([
                {$match: {limit: 10000}},
                {$lookup: {
                    from: "customers",
                    localField: "account_id",
                    foreignField: "accounts",
                    as: "acc"
                }},
                {$unwind: "$acc"}
            ]).toArray();
        return customersAux;
    }catch(error){
        console.error("No se han encontrado customers con ese limite de cuenta.", error);
    }
}

//el ejercicio 5 no entiendo donde estarian las 'transactions', no las veo en ninguna de las dos APIs

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWith4Acc, getCustomersWithAccLimited};