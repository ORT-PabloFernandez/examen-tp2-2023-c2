const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function findCustomerByEmail(email) {
    return customers.findCustomerByEmail(email);
}

async function getCustomersWithAccounts(){
    return customers.getCustomersWithAccounts();
}

async function getCustomersWithAccountLimit() {
    return customers.getCustomersWithAccountLimit();
}
module.exports = {getAllCustomers, getCustomer, findCustomerByEmail, getCustomersWithAccounts, getCustomersWithAccountLimit};