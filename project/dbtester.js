
oracledb = require('oracledb');

oracledb.getConnection(
  {
    user: 'c##java',
    password: 'oracle',
    connectString: '192.168.219.106:1521/xe'
  },
  (err, connection) => {
    if (err) {
      console.error(err.message);
      return;
    }

    // Connection established. Now execute your query.
    const sql = "SELECT * FROM user_catch where user_id='sss' ";

    connection.execute(sql, (err, result) => {
      if (err) {
        console.error(err.message);
        return;
      }

      // Process the query results
      console.log(result.rows); // The result data will be an array of rows

      // Release the connection
      connection.release((err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });
  }
);