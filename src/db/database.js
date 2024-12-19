const mysql = require('mysql');

// Configuration for the database connection
const config = {
    host: 'localhost',          
    user: 'root',              
    password: 'Pavi@85',              
    port: 3306,                 
    database: 'meetmate',  
};

// Create a connection pool
const connection = mysql.createPool(config);

// Test the connection
connection.getConnection((err, con) => {
    if (err) {
        console.error('MySQL Connection Error ->', err.message);
    } else if (con.state === 'disconnected') {
        console.error('Database connection failed. Please ensure the database is running and the configuration is correct.');
    } else {
        console.log('MySQL Connection State:', con.state);
        con.release(); 
    }
});

module.exports = connection;