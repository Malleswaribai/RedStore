const mysql = require('mysql2');
const conn = mysql.createConnection(
    {
        host:"database-2.cjqpyslxmtms.us-west-2.rds.amazonaws.com",
        port:"3306",
        user:"admin",
        password:"zeroop123",
        database:"RedStore"
    }
)

module.exports = conn;