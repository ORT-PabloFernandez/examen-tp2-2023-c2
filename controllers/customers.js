const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function getCustomerByEmail(email){
    return customers.getCustomerByEmail(email);
}

async function getCustomersWith4Plus(){
    return customers.getCustomersWith4Plus();
}

async function getCustomersLimit10000(){
    return customers.getCustomersLimit10000();
}
async function getAllTransactions(nombre, apellido){
    const name = nombre +" " +apellido;
    console.log(name);
    return customers.getCustomerTransactions(name);
}
module.exports = {getAllCustomers, getCustomer, getCustomerByEmail,getCustomersWith4Plus,getCustomersLimit10000,getAllTransactions};