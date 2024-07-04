const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');
const jwt = require('jsonwebtoken');

const router = require('./routes');

const PORT = process.env.PORT || 8000;

const app = express();

//conf middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// add {alter:true} or {force:true} in sync() parameters to update/force update the db
db.sequelize.sync().then(() => {
  console.log('db is re syced');
});

app.use('/api',router)

app.listen(PORT, () => console.log(`server is running at localhost:${PORT}`));
