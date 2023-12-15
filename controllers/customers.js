const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}
async function getCustomerByEmail(email) {
    return customers.getCustomerByEmail(email);
}
async function getCustomersWithAtLeast4Accounts() {
    return customers.getCustomersWithAtLeast4Accounts();
}
async function getCustomersByAccountLimit(limit) {
    return customers.getCustomersByAccountLimit(limit);
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWithAtLeast4Accounts, getCustomersByAccountLimit};