import React, { useEffect, useContext, useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Router } from "react-router-dom";

const BASE_URL = `https://expenseease-70qj.onrender.com${/api/v1/transaction/}`;


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const navigate=useNavigate();

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    // useEffect(()=>{
    //     const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    //     console.log("Tnis is global")
    //     console.log(userInfo)
    //     setUser(userInfo);
    //     if(!userInfo)
    //     navigate("/")

    // },[navigate]);
          const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
    //   console.log(user)
      
        navigate("/transaction")
    }

    //calculate incomes
    const addIncome = async (income) => {
        // console.log("plaese add");
        const config={
            headers:{
              Authorization:`Bearer ${user.token}`,
    
          },
        };
        const response = await axios.post(`${BASE_URL}add-income`, 
            income,
            config)
            
        
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const config={
            headers:{
              Authorization:`Bearer ${user.token}`,
    
          },
        };
        try{
        const response = await axios.get(`${BASE_URL}get-incomes`,config)
        setIncomes(response.data)
        // console.log(response.data)
        // console.log("got incomes");
        }
        catch(error){
            console.log("error");
        }
        
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async ( income) => {
        const config={
            headers:{
              Authorization:`Bearer ${user.token}`,
    
          },
        };
        const response = await axios.post(`${BASE_URL}add-expense`,
            income

        , config)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const config={
            headers:{
              Authorization:`Bearer ${user.token}`,
    
          },
        };
        const response = await axios.get(`${BASE_URL}get-expenses`,config)
        setExpenses(response.data)
        // console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            user,
            setUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
