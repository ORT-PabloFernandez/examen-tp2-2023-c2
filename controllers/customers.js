const customers = require('../data/customers');
const accountsService = require('../services/accounts');

async function getAllCustomers(pageSize, page){    
    return customers.getAllCustomers(pageSize, page);
}

async function getCustomer(id){
    return customers.getCustomer(id);
}

async function getCustomerByEmail(email) {
    return customers.getCustomerByEmail(email);
}

async function getCustomersByQuantityAccounts(quantity) {
    let allCustomers = await customers.getAllCustomers(0, 0);
    //return customers.getCustomersByQuantityAccounts(quantity);
    return allCustomers.filter(ac => ac.accounts.length >= quantity);
}

//logica de negocio deberia ir en capa de servicio (costumerService)
async function getCustomersByAccountsLimit(limit) {
    let allCustomers = await customers.getAllCustomers(0, 0);
    //console.log(allCustomers[0]);
    let customersWithAccountsLimit = [];

    for(let i = 0; i < allCustomers.length; i++) {
        let customer = allCustomers[i];
        if (accountsService.hasAccountsWithLimit(customer, limit)) {
            customersWithAccountsLimit.push(customer);
        }
    }
    return customersWithAccountsLimit;
}

module.exports = {
    getAllCustomers,
    getCustomer,
    getCustomerByEmail,
    getCustomersByQuantityAccounts,
    getCustomersByAccountsLimit
};