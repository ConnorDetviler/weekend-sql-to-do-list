const pg = require('pg');

//Setup PG to connect to the database
const Pool = pg.Pool;
const pool = new Pool ({
    //basically creating new connection with our database. 
    // database: 'todo_list', //the name of database, This can change!
    // host: 'localhost', // where is your database?
    // port: 5432, //the port for your database
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
})

// helpers breadcrumbs
pool.on('connect', ()=> {
    console.log('PG CONNECTED');
})
/////////// for heroku
client.query('SELECT public,todos FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
/////////// ^ for heroku
pool.on('error', (error)=>{
    console.log(error);
})

module.exports = pool;