const customers = require('../data/customers');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}


//ejercicio 1
async function getCustomerByEmail(email){
    return customers.getCustomerByEmail(email);
}

//ejercicio 2
async function getCustomersWith4Acc(){
    return customers.getCustomersWith4Acc();
}

//ejercicio 4
async function getCustomersWithAccLimited(){
    return customers.getCustomersWithAccLimited();
}

module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWith4Acc, getCustomersWithAccLimited};