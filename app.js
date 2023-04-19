const express = require('express')
const app = express();
const path = require('path')
const adminRoute = require('./routes/admin')
const errorController = require('./controller/error')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static(path.dirname('public')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(adminRoute)

app.use(errorController.get404)
app.listen(PORT)
