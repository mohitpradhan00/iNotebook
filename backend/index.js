const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

connectToMongo();
var app = express()
app.use(cors({
  credentials: true,
  origin: process.env.REACT_APP_FRONTEND
}))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(process.env.REACT_APP_BACKEND_PORT, () => {
  console.log(`iNotebook app listening on port ${process.env.REACT_APP_BACKEND_PORT}`)
})