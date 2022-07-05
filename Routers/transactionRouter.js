const express = require('express');
const generateHash = require('../generateHash');
const middleware = require('../middleware');
const mysql = require('../database');
const router = express.Router();

router.get('/' , middleware , (req,res,next)=>{
    res.render('transaction');
})


// create table order_info(
// 	order_id varchar(20),
//     total_price int ,
//     user_id int,
//     Address varchar(255),
//     order_date date,
//     order_status varchar(30)
// );

// create table order_items(
// 	   order_id varchar(20),
//     product_id int ,
//     qty int
// )

// { qty: 1, p_price: 139, p_id: 2 },
// { qty: 1, p_price: 1999, p_id: 8 }

router.post('/' , (req,res)=>{
    var user_id = req.session.user.user_id; 
    const data = req.body;
    var order_id =  generateHash();
    var sql = `select qty,(qty)*( p_price) as p_price ,pro_id as p_id from product,cart where pro_id=p_id and  user_id = ${user_id}`;
    mysql.query(sql , (err , cart)=>{
        
        console.log(cart)
        let total_price = 0;
        cart.forEach((item)=>{
            total_price+=item.p_price;
        });
        console.log(order_id);
        var Shipping_Add = `${data. street_address} , ${data.city} , ${data.postcode}`;
        sql = `insert into order_info values("${order_id}" , ${total_price}, ${user_id},"${Shipping_Add}","${new Date().toISOString().slice(0, 19).replace('T', ' ')}" , "ACTIVE")`;
        mysql.query(sql); // here we are creating the new order info
        cart.forEach((item)=>{
            sql = `insert into order_items values("${order_id}" , ${item.p_id} , ${item.qty})`;
            mysql.query(sql);
        })
        sql = `delete from cart where user_id = ${user_id}`;
        mysql.query(sql);
    })
    res.redirect('/cart');
})


module.exports = router;