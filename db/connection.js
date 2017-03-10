var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'seek'
});

// function start {
//   connection.connect();
// }
//
// function end {
//   connection.end();
// }
// start db connection
// connection.connect();
//
// // log something to confirm connection
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// // end db connection
// connection.end();

module.exports = connection;
