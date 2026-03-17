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
app.get('/api/GetClassTypes',async (req,res)=>{try {
    const sqlQuery = 'SELECT * FROM "classtypes"'
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);

}
catch (err)
{
    res.status(500).json({error:"server error"});
}
})

app.post('/api/AddClass',async (req,res) =>{try {
    const sqlQuery = '"addClass" $1 $2 $3 $4';
    const values = req.body;
    const result = await pool.query(sqlQuery,values);
    res.status(200).json({message: 'class added'});
}
catch(err)
{
    res.status(500).json({error: 'server error'});
}
});
app.get('/api/GetAvailableTrainers',async (req,res)=>{try {
    const sqlQuery = "select P.id,P.name,P.surname from person P right join employees E on E.id = P.id where E.jobtitle = 'Trener'"
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
}
catch (err)
{
    res.status(500).json({error:'server error'});
}
})
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
});
app.get('/api/Employees',async (req,res)=>{try {
    const sqlQuery = 'select P."id",P."name" ,P."surname",P."email",P."login",P."role",E."jobtitle",E."hiredate",E."hourlysalary" from "person" P right join "employees" E on E."id" = P."id" '
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
}
catch(err)
{
    res.status(500).json({error: "server error"});
}
})
app.get('/api/Services', async (req,res) =>{
    try {
        const sqlQuery = 'SELECT "serviceid","servicename","price" from "services"';
        const result = await pool.query(sqlQuery);
        res.status(200).json(result.rows);
    }
    catch(err)
    {
        console.log("fetch error",error.message);
        res.status(500).json({error:'server error'});
    }

})
app.post('/api/Auth', async(req,res)=>{
    try {
        const {Login, Password} = req.body;
        const sqlQuery = 'SELECT "name","surname","email","login","role","password" FROM "person" where "login" = $1';
        const values = [Login]
        const result = await pool.query(sqlQuery, values);
        if (result.rows.length > 0) {
            if ( result.rows[0].password === Password)
            {
                const user = result.rows[0];
                const data = {
                    name : user.name,
                    surname: user.surname,
                    email:user.email,
                    login:user.login,
                    role:user.role,
                }
                res.status(200).json(data);
            }

            else{
                res.status(401).json({error:'wrong password'});
            }
        }
        else {
            res.status(404).json({error: 'user not found'});
        }
    }
    catch(err)
    {
    res.status(500).json({error:'server error'});
    }
});
