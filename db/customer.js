const db = require('./dbconfig');

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

const updateCustomer = (req, res) => {
    const query = {
        text: 'UPDATE customers SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE id = $5',
        values: [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.params.id]
    }
    db.query
    (query
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result.rows);
        }
    })
};

const deleteCustomer = (req, res) => {
    const query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id]
    }
    db.query
    (query
        , (err, result) => {
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
    addCustomer: addCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
}