const mysql = require('mysql2');
const conn = mysql.createConnection(
    {
        host:'localhost',
        user:'Zeroop',
        password:'Zeroop@123',
        database:'RedStore'
    }
)

module.exports = conn;