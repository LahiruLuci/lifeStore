import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.NODE_ENV === 'development' ? process.env.MYSQL_PASSWORD: process.env.MYSQL_PRO_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    
});
// console.log("adfdg")
export default pool;
