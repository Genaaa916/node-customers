const db = require('./db/dbconfig');

// add new customer, generate id with date.now
const addCustomer = (req, res) => {
    const newCustomer = {'id': Date.now().toString(), ...req.body};
    const query = {
        text: 'INSERT INTO customers (id, first_name, last_name, email, phone) VALUES ($1, $2, $3, $4, $5)',
        values : [newCustomer.id, newCustomer.firstName, newCustomer.lastName, newCustomer.email, newCustomer.phone]
    }
    db.query(query, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {  
            res.json(newCustomer);
    }
})
};

// get all customers
const getAllCustomers = (req, res) => {
    db.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows);
        }
    })
};

//get one customer by id
const getCustomerById = (req, res) => {
    const query = {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [req.params.id] 
    }
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if(result.rows.length > 0) {
            res.json(result.rows);
        }else{
            res.status(404).end();
        }
    }
    })
};

module.exports = { 
    getAllCustomers: getAllCustomers,
    getCustomerById: getCustomerById,
    addCustomer: addCustomer
}