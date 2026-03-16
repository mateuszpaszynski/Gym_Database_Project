require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_URL_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    ssl:{
       rejectUnauthorized : false
   }
});
pool.connect((err)=>{
    if (err) {
        console.log('Connection failed',err.message);
    }
    else {
        console.log('Connected');
    }
})
const PORT = process.env.PORT || 5432;
app.listen(PORT,()=>console.log(`Server slucha na porcie ${PORT}`));

app.get('/api/Customers',async (req,res)=>{
    try {
            const sqlQuery = 'SELECT P."id",P."name",P."surname",P."email",P."login" FROM "customers" as C LEFT JOIN "person" as P on P."id" = C."id"'
            const result = await pool.query(sqlQuery);
            res.status(200).json(result.rows);
    }
    catch(err)
    {
        console.error("Blad pobierania",error.message);
        res.status(500).json({error :'server error'});
    }
})