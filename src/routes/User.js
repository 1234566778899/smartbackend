const express = require('express');
const { register, login, addCustomer, getCustomers, updateCustomer, deleteCustomer, getUser } = require('../controllers/User');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add', addCustomer);
router.get('/list', getCustomers);
router.put('/edit/:id', updateCustomer);
router.get('/delete/:id', deleteCustomer);
router.get('/find/:id', getUser);

module.exports = router;