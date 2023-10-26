const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function getCustomerByMail(email) {
    return customers.getCustomerByMail(email);
}

async function getCustomers4Accounts() {
    return customers.getCustomers4Accounts();
}

async function getCustomersWithAccountLimit() {
    return customers.getCustomersWithAccountLimit();
}

module.exports = {getAllCustomers, getCustomer, getCustomerByMail, getCustomers4Accounts, getCustomersWithAccountLimit};