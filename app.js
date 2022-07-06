const express = require('express');
const mysql = require('./database');
const session = require('express-session')
const middleware = require('./middleware')
const bp = require('body-parser');
const app = express();
app.use(bp.urlencoded({extended:true}));
const port = 3000;
app.use(express.static(__dirname+"/public"));
app.set('view engine' , 'ejs');

app.use(session({
    secret:"RedStore",
    resave:true,
    saveUninitialized:false
}))
// Routers

const homeRouter = require('./Routers/homeRouter');
app.use('/' , homeRouter);

const productPageRouter = require('./Routers/productsPageRouter')
app.use('/product' , productPageRouter );

const loginRouter = require('./Routers/loginRouter');
app.use('/login' , loginRouter);

const transactionRouter = require('./Routers/transactionRouter');
app.use('/transaction' , transactionRouter);

const orderHistoryRouter = require('./Routers/orderHistoryRouter');
app.use('/order_history',orderHistoryRouter);

const invoiceRouter = require('./Routers/invoiceRouter');
app.use('/invoice' , invoiceRouter);

const apiRouter = require('./Routers/api');
app.use('/api/' , apiRouter);


//  Admin routers


const adminDashboard = require('./Routers/admin/dashboard');
app.use('/adminDashboard' , adminDashboard);


const userList = require('./Routers/admin/userList');
app.use('/userList' , userList);

const productList = require('./Routers/admin/productList');
app.use('/productList' , productList);

const orders = require('./Routers/admin/orders');
app.use('/orders' , orders);

const addProduct  = require('./Routers/admin/addProduct');
app.use('/addProduct' , addProduct);


app.get('/cart' , middleware ,  (req,res , next)=>{
    var user_id = req.session.user.user_id;
    if(req.query.p_id){
        var p_id = req.query.p_id;
        var sql = `delete from cart where user_id = ${user_id} and pro_id = ${p_id}`;
        mysql.query(sql);
    }
    // this will auto matically check the 
    if(req.query.all){
        var sql = `delete from cart where user_id = ${user_id}`;
        mysql.query(sql);
    }
    var sql = `select p_name,qty, p_image ,(qty)*( p_price) as p_price ,pro_id as p_id, category_name as p_cat, brand_name , user_id from product,cart,category,brand where pro_id=p_id and cat_id=p_category and brand_id=p_brand and cart.user_id = ${user_id}  `;
    mysql.query(sql , (err , result)=>{
        if(err) throw err;
        let total_price = 0;
        result.forEach((item)=>{
            total_price +=item.p_price;
        });
        const payload = {};
        payload.cart_items = result;
        payload.user_id = req.session.user.user_id;
        payload.total_price = total_price;
        res.render('cart' , payload);
    })
});


app.listen(port , ()=>{
    console.log("Server is running at port:"+port);
})