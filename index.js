const bodyParser = require('body-parser');
const express = require('express');
const app = express();  
app.use(bodyParser.json());

const port = 3000;
// customers array
let customers = [
  {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
  {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
  {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// get all customers
app.get('/api/customers', (req, res) => {
    res.json(customers);
});

// delete customer by id
app.delete('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    customers = customers.filter(customer => customer.id !== id);
    res.status(204).end();
});

//update customers by id
app.put('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    const updatedcustomer = {...req.body, id: id};
    const index = customers.findIndex(customer => customer.id === id);
    customers.splice(index, 1, updatedcustomer);
    res.json(updatedcustomer);
});
// add new customer
app.post('/api/customers', (req, res) => {
    const newCustomer = {'id': Date.now().toString(), ...req.body};
    customers = [...customers, newCustomer];
    res.json(newCustomer);
});

//get customer by id
app.get('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    const customer = customers.filter(customer => customer.id === id);
    if (customer.length > 0) {
        res.json(customer);
    } else {
        res.status(404).end();
}});
// listen on port 3000
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})  
