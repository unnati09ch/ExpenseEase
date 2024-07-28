const Expense = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    
    try {
        // validations
        if(!title || !category || !description ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        console.log(req.user._id);
        const expense = await Expense.create({
            title,
            amount,
            category,
            description,
            date,
            users:req.user._id
           
        })
    
        console.log(expense)
       return  res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}

    


exports.getExpenses = async (req, res) =>{
    
    try{
            console.log(req.user._id)
            // const incomes=await Income.find({ users: "66a0c7e475366e3fafb2f55b"  } )
            // .populate("")
        
            const expenses=await Expense.find({users:req.user._id}).populate('users',"-password")

            console.log(expenses);
      return  res.status(200).json(expenses)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    Expense.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
