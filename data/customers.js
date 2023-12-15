const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';
const ACCOUNTS = 'accounts';
const LIMITE= 10000;
async function getAllCustomers(pageSize, page){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return customers;
}
async function getAccounts(pageSize, page){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
                        .db(DATABASE)
                        .collection(ACCOUNTS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return accounts;
}


// Necesito que me devuelva un cliente particular por correo electrónico

async function getClienteEmail(email){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
            .db(DATABASE)
            .collection(CUSTOMERS)
            .find({email : { $eq: email}})
            .toArray();
    return customer; 

}

// Necesito retorne a los clientes que tengan al menos 4 cuentas

async function getClientesCuentas() {
    const connectiondb = await conn.getConnection(); 
    const customer = await connectiondb
          .db(DATABASE)
          .collection(CUSTOMERS)
          .find({accounts : {$gte: 4}})
          .toArray(); 

    return customer; 
}

// Necesito conocer de la colección de cuentas las cuentas que tienen un límite de 10.000
async function cuentasConLimite(){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
          .db(DATABASE)
          .collection(ACCOUNTS)
          .find({limit : { $eq: LIMITE}})
          .toArray();

    return accounts;
}

// Necesito un listado de los clientes que tienen una cuenta con 10.000 de limite
async function clientesConLimite(){
    const connectiondb = await conn.getConnection();
    const accounts = await connectiondb
          .db(DATABASE)
          .collection(ACCOUNTS)
          .find({})
          .toArray(); 
    
    const cuentaLimite = accounts.filter((cuenta) => cuenta.accounts === LIMITE);
   
    const idsCuentaLimite = cuentaLimite.map((cuenta) =>({
        id: cuenta.id
    })); 

    const clientes = getClientesCuentas(); 
    const final = clientes.filter((cliente) => {
        cliente.id === idsCuentaLimite.find((id) => id === cliente.id)
    }); 
        
}
module.exports = {
    getAllCustomers,
    getAccounts,
    getClienteEmail,
    getClientesCuentas,
    cuentasConLimite,
    clientesConLimite,
};