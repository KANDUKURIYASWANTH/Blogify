// express app
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes');

//connect to mongo db
const dburi=process.env.MONOGO_URL;
const PORT = process.env.PORT || 4005;
mongoose.connect(dburi,{useNewUrlParser: true})
    .then((result)=>app.listen(PORT))
    .catch((err)=>console.log(err));


//register view engine
app.set('view engine','ejs');

//3rd party middle ware

//static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//Routing html pages
app.get('/',(req,res)=>{
    res.redirect('/blogs');
})
app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
})

//Blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    res.render('404',{title: '404'});
});