var mssql = require('mssql');
const connStr = "Server=00.00.00.00;Database=teste;User Id=teste;Password=123456;";
const connection = new mssql.connect(connStr);         
 module.exports = function() {
     return connection
 }