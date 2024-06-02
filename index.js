const express = require('express');
const app = express();
const routs = require('./routs');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const { authMiddleWare } = require('./middlewares/authMiddleWare');
const {join} = require("path");
const { isAuth } = require('./middlewares/authMiddleWare');



app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



//app.use(isAuth)
app.use(authMiddleWare);
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine' , 'hbs');





app.use(routs);
//todo change db name
mongoose.connect('mongodb://localhost:27017/examJS');
mongoose.connection.on('connected', () => console.log('connected to db'));



app.listen(5000,() =>console.log( 'Server is listening on http://localhost:5000'));