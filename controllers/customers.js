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

async function getCustomersLte10kAcounts(){
    return customers.getCustomersLte10kAcounts();
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersGte4, getCustomersLte10kAcounts};