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
const isDev = process.env.NODE_ENV === 'development';
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
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
        });
}
})
app.post('/api/RegisterForClass/:id', async (req,res)=>{try {
    const ScheduleID = req.params.id;
    const {id} = req.body;
    const sqlQuery = "insert into classregistrations (scheduleid,customerid) values ($1,$2)"
    const values = [ScheduleID,id];
    await pool.query(sqlQuery,values);
    res.status(200).json({message:'You have been sucessfully registered'});
}
catch(err)
{
    console.log(err)
    res.status(500).json({message: "internal server error"})
}
})
app.put('/api/UpdateClass', async (req,res)=>{
   try {

       const sqlQuery = 'update classschedule set classid = $1, max_slots = $2, employeeid = $3,starttime = $4,durationtime=$5 where scheduleid = $6';
       const {classid,max_slots,employeeid,starttime,durationtime,scheduleid} = req.body;
       const values =[classid,max_slots,employeeid,starttime,durationtime,scheduleid];
       await pool.query(sqlQuery,values);
       res.status(200).json({message:'class updated'});
   }
   catch(err)
   {
       res.status(500).json({
           error:"server error",
           debug_message: isDev ? err.message : undefined,
           sql_code: isDev ? err.code : undefined
       });
   }
});
app.delete('/api/DeleteClass/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const sqlQuery = 'delete from classschedule where scheduleid =$1'
        await pool.query(sqlQuery,[id]);
        res.status(200).json({message:'class deleted'});
}
catch(err)
{
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
    });
}
})
app.get('/api/Classes', async (req,res)=>{try {

    const sqlQuery = "select CS.scheduleid,CS.classid,CT.classname,CS.registered,CS.max_slots, CS.employeeid,CONCAT(E.name,' ',E.surname) as trainer ,right(left(CS.starttime::text,16),5) as time, CS.durationtime,CS.starttime\n" +
        "from classschedule CS left join classtypes CT on CS.classid = CT.classid\n" +
        "left join person E on E.id = CS.employeeid ";
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
}
catch(err)
{
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
    });
}
})
app.post('/api/AddClass',async (req,res) =>{try {
    const sqlQuery = 'CALL addClass($1, $2, $3, $4, $5 )';
    const {classid,max_slots,employeeid,starttime,durationtime} = req.body;
    const values =[classid,max_slots,employeeid,starttime,durationtime];
    const result = await pool.query(sqlQuery,values);
    res.status(200).json({message: 'class added'});
}
catch(err)
{
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
    });
}
});
app.get('/api/GetAvailableTrainers',async (req,res)=>{try {
    const sqlQuery = "select P.id,P.name,P.surname from person P right join employees E on E.id = P.id where E.jobtitle = 'Trener'"
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
}
catch (err)
{
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
    });
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
        res.status(500).json({
            error:"server error",
            debug_message: isDev ? err.message : undefined,
            sql_code: isDev ? err.code : undefined
        });
    }
});
app.get('/api/Employees',async (req,res)=>{try {
    const sqlQuery = 'select P."id",P."name" ,P."surname",P."email",P."login",P."role",E."jobtitle",E."hiredate",E."hourlysalary" from "person" P right join "employees" E on E."id" = P."id" '
    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
}
catch(err)
{
    res.status(500).json({
        error:"server error",
        debug_message: isDev ? err.message : undefined,
        sql_code: isDev ? err.code : undefined
    });
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
        res.status(500).json({
            error:"server error",
            debug_message: isDev ? err.message : undefined,
            sql_code: isDev ? err.code : undefined
        });
    }

})
app.post('/api/Auth', async(req,res)=>{
    try {
        const {Login, Password} = req.body;
        const sqlQuery = 'SELECT id,"name","surname","email","login","role","password" FROM "person" where "login" = $1';
        const values = [Login]
        const result = await pool.query(sqlQuery, values);
        if (result.rows.length > 0) {
            if ( result.rows[0].password === Password)
            {
                const user = result.rows[0];
                const data = {
                    id: user.id,
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
        res.status(500).json({
            error:"server error",
            debug_message: isDev ? err.message : undefined,
            sql_code: isDev ? err.code : undefined
        });
    }
});
