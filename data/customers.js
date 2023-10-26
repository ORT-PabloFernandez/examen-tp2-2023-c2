const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';

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

async function findByEmail(email){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({email});    
    return customer
}

async function getCustomerWithMin4Account(accounts) {
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .find({
        $expr: {
          $gte: [{ $size: "$accounts" }, accounts],
        },
      })
      .toArray();
  
    // Si el array es = a 0 devuelvo null para controlar un array vacio; 
    if(customers.length === 0){
        return null;
    }

    return customers;
  }

  async function getCustomersWithAccountLimit(limit) {
    const connectiondb = await conn.getConnection();
    
    // Realizo la conexion con la DB de accounts y genero un array 
    const accounts = await connectiondb
      .db(DATABASE)
      .collection(ACCOUNTS)
      .find({
        "limit": limit
      })
      .toArray();

    if (accounts.length === 0) {
        return null;
    }

    // Genero un nuevo array relacionando los accounts con el account id 
    const accountIds = accounts.map(account => account.account_id);

    // Consulto los clientes que tienen esas cuentas en su lista de cuentas
    const customers = await connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .find({
        "accounts": { $in: accountIds }
      })
      .toArray();

    return customers;
}


module.exports = {getAllCustomers, 
    getCustomer,
    findByEmail,
    getCustomerWithMin4Account,
    getCustomersWithAccountLimit
};