const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function findByEmail(email){
    return customers.findByEmail(email);
}

async function getCustomerWithMin4Account(accounts){
    return customers.getCustomerWithMin4Account(accounts);
}

async function getCustomersWithAccountLimit(limit){
    return customers.getCustomersWithAccountLimit(limit);
}

module.exports = {
    getAllCustomers, 
    getCustomer,
    findByEmail,
    getCustomerWithMin4Account,
    getCustomersWithAccountLimit
};