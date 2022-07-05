const express = require('express');
const router = express.Router();


const checkLoggedIn = require('./api/checkLoggedIn')
router.use('/checkLoggedIn' , checkLoggedIn);

const changeQty = require('./api/changeQty');
router.use('/changeQty' , changeQty);


const addToCart = require('./api/addToCart');
router.use('/addToCart' , addToCart);

const clearCart = require('./api/clearCart');
router.use('/clearCart' ,clearCart);

const removeCartItem = require('./api/removeCartItem');
router.use('/removeCartItem' ,removeCartItem);

module.exports = router;