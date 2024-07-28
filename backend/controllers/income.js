const Income= require("../models/IncomeModel")
const User=require("../models/UserModel")


exports.addIncome = async (req, res) => {
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
        const income = await Income.create({
            title,
            amount,
            category,
            description,
            date,
            users:req.user._id
           
        })
    
        console.log(income)
       return  res.status(200).json({message: 'Income Added'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }

    
}

exports.getIncomes = async (req, res) =>{
    
    try{
            console.log(req.user._id)
            // const incomes=await Income.find({ users: "66a0c7e475366e3fafb2f55b"  } )
            // .populate("")
        
            const incomes=await Income.find({users:req.user._id}).populate('users','-password');

            console.log(incomes);
      return  res.status(200).json(incomes)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    Income.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}