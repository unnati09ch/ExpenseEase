const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
// const {readdirSync} = require('fs')
 const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const UserRoutes=require("./routes/userroutes");
const TransactionRoutes=require("./routes/transactions");

const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())
app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/transaction",TransactionRoutes);

//routes


// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()