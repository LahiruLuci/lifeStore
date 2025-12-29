// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     // password: process.env.NODE_ENV === 'development' ? process.env.MYSQL_PASSWORD: process.env.MYSQL_PRO_PASSWORD,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
    
// });
// // console.log("adfdg")
// export default pool;

// import mysql from "mysql2/promise";

// const port = Number(process.env.MYSQL_PORT ?? 3306);

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST ?? "127.0.0.1",
//   port,
//   user: process.env.MYSQL_USER ?? "root",
//   password: process.env.MYSQL_PASSWORD ?? "",
//   database: process.env.MYSQL_DATABASE ?? "",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// console.log("[DB CONFIG]", { host: process.env.MYSQL_HOST, port });
// export default pool;


import "server-only";
// config/mysql.js (ESM)
import mysql from "mysql2/promise";

// Parse env (env vars are strings)
const PORT = Number(process.env.MYSQL_PORT ?? 3306);

// Create (or reuse) a single pool — helpful during Next.js dev HMR
function createPool() {
  return mysql.createPool({
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: PORT,
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
  });
}

const globalForMysql = globalThis;
const pool = globalForMysql.__mysqlPool ?? createPool();
if (!globalForMysql.__mysqlPool) {
  globalForMysql.__mysqlPool = pool;
  console.log("[DB CONFIG]", { host: process.env.MYSQL_HOST, port: PORT });
}

export default pool;