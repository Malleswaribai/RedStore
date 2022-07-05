const express = require('express');
const router = express.Router();
const mysql = require('../database');
router.get('/' , (req,res,next)=>{
    // if(req.query.addtocart){
    //     console.log(req.query.user_id);
    //     var product_id = req.query.addtocart , user_id = req.session.user.user_id;
    //     var sql = `select * from cart where user_id= ${user_id} and pro_id = ${product_id}`;
    //     mysql.query(sql , (err,records)=>{
    //         if(err) throw err;
    //         // here we are making sure that if there is already a item in the cart then we are not adding the same item once again
    //         if(records.length == 0){

    //             sql = ` insert into cart (pro_id , user_id,ip_address,qty)values(${product_id} , ${user_id} ," 192.168.56.1",1) `;
    //             mysql.query(sql);
    //         }
    //     });
    // }
    var username = "";
    if(req.session.user  && req.session.user.username!=""){
        username = req.session.user.username 
    }
    console.log(req.query);
    var sql = " select p_id ,  p_name , p_image , brand_name,category_name,p_price from product inner join brand on p_brand = brand_id inner join category on p_category = cat_id ;";
    mysql.query(sql , (err,result)=>{
        res.render('product', {products:result , "username":username});
    });
});
module.exports = router;