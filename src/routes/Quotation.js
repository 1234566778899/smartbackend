const express = require('express');
const { addQuotation, getQuotations, deleteQuotation, getDateAndQuantity, getQuotation, updateState, addReference } = require('../controllers/Quotation');
const router = express.Router();

router.post('/add', addQuotation);
router.post('/list', getQuotations);
router.get('/delete/:id', deleteQuotation);
router.get('/report', getDateAndQuantity);
router.get('/:id', getQuotation);
router.put('/state/:id', updateState);
router.put('/reference/:id', addReference);

module.exports = router;