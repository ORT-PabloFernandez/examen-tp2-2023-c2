const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getClienteEmail(email){
    return customers.getClienteEmail(email);
}

 async function getClientesCuentas(){
    return customers.getClientesCuentas(); 
 }

 async function getClientesCuentas(){
    return customers.getClientesCuentas(); 
 }

 async function cuentasConLimite(){
    return customers.cuentasConLimite(); 
 }

 async function clientesConLimite(){
    return customers.clientesConLimite(); 
 }



module.exports = {
    getAllCustomers,
    getClienteEmail,
    getClientesCuentas,
    cuentasConLimite,
    clientesConLimite,
};