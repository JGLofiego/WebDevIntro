const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config() // Ao criar dotenv passa as configurações para o database

let pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

exports.pool = pool