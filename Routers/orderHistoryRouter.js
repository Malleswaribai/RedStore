const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const mysql = require('../database');
router.get('/' , middleware , (req,res)=>{
    var sql = `select * from order_info`;
    mysql.query(sql , (err, orders)=>{
        console.log(orders);
        res.render('order_history' , {orders:orders});
    })
})

module.exports = router;