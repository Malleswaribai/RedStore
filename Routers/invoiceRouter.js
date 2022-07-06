const express = require('express');
const middleware = require('../middleware');
const mysql = require('../database');
const router = express.Router();
router.get('/:order_id' ,middleware, (req,res,next)=>{
    const order_id = req.params.order_id;
    const user_id = req.session.user.user_id;
    var sql = `select * from order_info where order_id = "${order_id}"`;
    mysql.query(sql , (err , result)=>{
        console.log(result);
        sql = `select b.p_name as description ,a.qty as quantity, b.p_price as unitCost ,a.qty*b.p_price as Amount  from order_items as a , product as b where order_id = "${order_id}" and a.product_id = b.p_id;`
        mysql.query(sql , (err,cart)=>{
            console.log(cart);
            return res.render('invoice' ,{order:result[0] , cart:cart, email:req.session.user.email});
        })
    })
})

module.exports = router;