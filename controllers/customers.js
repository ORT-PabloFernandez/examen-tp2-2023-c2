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

async function getCustomersWithFourOrMoreAccounts() {
    return customers.getCustomersWithFourOrMoreAccounts();
  }
  



async function getCustomersWithHighLimit(limit) {
    return customers.getCustomersWithHighLimit(limit);
  }
  





module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getCustomersWithHighLimit, getCustomersWithFourOrMoreAccounts};