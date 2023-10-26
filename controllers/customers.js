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

async function getCustomer4AccountsOrMore(){
    return customers.getCustomer4AccountsOrMore();
}

async function getCustomersAccountLimit10000(){
    return customers.getCustomersAccountLimit10000();
}

async function getCustomersByName(name){
    return customers.getCustomersByName(name);
}

module.exports = 
{
    getAllCustomers,
    getCustomer, 
    getCustomerByEmail, 
    getCustomer4AccountsOrMore,
    getCustomersAccountLimit10000,
    getCustomersByName
};