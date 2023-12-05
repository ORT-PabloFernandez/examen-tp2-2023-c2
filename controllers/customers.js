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

async function getCustomersFourAccounts(number){
    return customers.getCustomersFourAccounts(number);
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersFourAccounts};