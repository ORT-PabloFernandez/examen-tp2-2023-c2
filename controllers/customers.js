const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getNameForAccount(name){    
    return customers.getNameForAccount(name);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function getCustomerEmail(email){
    return customers.getCustomerEmail(email);
}

async function getCustomerName(name){
    return customers.getCustomerName(name);
}

async function getAllCustomersMoraFourAccount(){
    return customers.getAllCustomersMoraFourAccount();
}

async function getAllCustomersAccounWithLimit(){
    return customers.getAllCustomersAccounWithLimit();
}

module.exports = {
    getAllCustomers,
    getCustomer,
    getCustomerEmail,
    getAllCustomersMoraFourAccount,
    getAllCustomersAccounWithLimit,
    getCustomerName,
    getNameForAccount
};