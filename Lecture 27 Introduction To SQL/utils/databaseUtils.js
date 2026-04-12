const sql = require('mysql2');


const pool = sql.createPool({
    host : 'localhost',
    user : '', // User Name
    password : '',  // SQL password
    database : "airbnb"
});

module.exports = pool.promise();