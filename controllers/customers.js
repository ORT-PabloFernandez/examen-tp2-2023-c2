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

async function getClientWithFourAccounts() {
    return customers.getClientWithFourAccounts();
}

async function getCustomersWithLimit(){
    return customers.getCustomersWithLimit();
}

async function getAllChrisTransactions() {
    return customers.getAllChrisTransactions();
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getClientWithFourAccounts,getCustomersWithLimit, getAllChrisTransactions};