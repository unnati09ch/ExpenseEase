const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const router = require('express').Router();
const protect=require("../miiddleware/authmiddleware");

router.post('/add-income',protect, addIncome)
    .get('/get-incomes',protect, getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense',protect, addExpense)
    .get('/get-expenses', protect,getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;