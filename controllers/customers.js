const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomerEmail(emailParam){
    return customers.getCustomerEmail(emailParam);
}

async function getCustomerFourAccounts(){
    return customers.getCustomerFourAccounts();
}

async function getCustomerLimit(){
    return customers.getCustomerLimit();
}


async function getCustomer(id){
    return customers.getCustomer(id);
}



module.exports = {getAllCustomers, getCustomer,getCustomerEmail, getCustomerFourAccounts, getCustomerLimit};
