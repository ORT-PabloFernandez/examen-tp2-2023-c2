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

async function getCustomersGte4(){
    return customers.getCustomersGte4();
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersGte4};