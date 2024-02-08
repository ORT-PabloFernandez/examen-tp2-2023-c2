const accountsController = require('../controllers/accounts');

async function hasAccountsWithLimit(customer, limit) {
    let accountsIds = customer.accounts;
    let matches = false;
    let index = 0;

    while(!matches && index < accountsIds.length) {
        let accountId = accountsIds[index];
        let account = await accountsController.getAccountByAccountId(accountId);
        let accountLimit = account.limit;

        if (accountLimit == limit) {
            matches = true;
        }
    }
    return matches;
}

module.exports = {
    hasAccountsWithLimit
}