import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'lucas',
  password: 'password',
  database: 'awari',
  port: 3306
})

export default connection;