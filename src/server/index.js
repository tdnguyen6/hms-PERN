const express = require('express')
const app = express()
const users = require('./routes/user')

app.use('/user', users)