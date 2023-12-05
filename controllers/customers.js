const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomerById(id){
    return customers.getCustomerById(id);
}

async function getCustomerByEmail(email){
    return customers.getCustomerByEmail(email);
}

async function getCustomersFourAccounts(){
    return customers.getCustomersFourAccounts();
}


module.exports = {getAllCustomers, getCustomerById, getCustomerByEmail, getCustomersFourAccounts};