const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_analytics';
const CUSTOMERS = 'customers';

async function getAllCustomers(pageSize, page){
    const connectiondb = await conn.getConnection();
    const customers = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return customers;
}

async function getCustomer(id){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({_id:new ObjectId(id)});    
    return customer;
}

async function getCustomerByEmail(email){
    const connectiondb = await conn.getConnection();
    const customer = await connectiondb
                        .db(DATABASE)
                        .collection(CUSTOMERS)
                        .findOne({ email }); 
    return customer;
}

async function getAllAccountsForCustomer(id) {
    const connectiondb = await conn.getConnection();
    const customerAccounts = await connectiondb
        .db(DATABASE)
        .collection(CUSTOMERS)
        .find({ id }) 
        .toArray();

    return customerAccounts;
}

async function getCustomersWithFourOrMoreAccounts() {
    const connectiondb = await conn.getConnection();
  
    return connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .find({
        $expr: { $gte: [{ $size: "$accounts" }, 4] }
      })
      .toArray();
  }

async function getCustomersWithHighLimit(limit) {
    const connectiondb = await conn.getConnection();
  
    return connectiondb
      .db(DATABASE)
      .collection(CUSTOMERS)
      .aggregate([
        {
          $lookup: {
            from: ACCOUNTS,
            localField: 'accounts',
            foreignField: 'account_id',
            as: 'matchingAccounts'
          }
        },
        {
          $match: {
            'matchingAccounts.limit': limit
          }
        },
        {
          $project: {
            username: 1,
            name: 1,
            email: 1,
          }
        }
      ])
      .toArray();
  }


module.exports = {getAllCustomers, getCustomer, getCustomerByEmail, getAllAccountsForCustomer, getCustomersWithHighLimit, getCustomersWithFourOrMoreAccounts};