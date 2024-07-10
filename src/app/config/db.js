import Pool from "./mysql";

let conn;

if (!conn) {
  conn = new Pool({
    user: "root",
    password: "Varnitha12345#",
    host: "127.0.0.1",
    port: "3306",
    database: "kaspersky_db",
  });
}
console("connection................................"+conn);
export { conn };