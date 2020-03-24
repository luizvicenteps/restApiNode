const { Router } = require('express');
const router = Router();

const { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/customerController');

router.get('/customer', getCustomers);
router.get('/customer/:id', getCustomerById);
router.post('/customer', createCustomer);
router.put('/customer/:id', updateCustomer)
router.delete('/customer/:id', deleteCustomer);

module.exports = router;