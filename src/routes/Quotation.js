const express = require('express');
const { addQuotation, getQuotations, deleteQuotation, getDateAndQuantity } = require('../controllers/Quotation');
const router = express.Router();

router.post('/add', addQuotation);
router.post('/list', getQuotations);
router.get('/delete/:id', deleteQuotation);
router.get('/report', getDateAndQuantity);

module.exports = router;