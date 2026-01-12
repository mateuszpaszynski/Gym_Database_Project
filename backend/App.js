const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
app.use(cors()); // To musi być, żeby React nie wywalał błędu
const config = {
    user: 'sa',
    password: 'admin',
    server: 'localhost',
    database: 'Silownia',
    options: { encrypt: false, trustServerCertificate: true }
};
app.get('/api/PopularClasses', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM PopularClasses')
        res.json(result.recordset); // Wysyłamy dane do przeglądarki/Reacta
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/api/Classes',async(req,res) =>{
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM dbo.GetClassSchedule ORDER BY StartTime');
        res.json(result.recordset);
    }catch(err)
    {
        res.status(500).send(err.message);
    }

});
app.get('/api/Services',async (req,res) =>{
    try{
    let pool = await sql.connect(config);
    let result = await pool.request().query('Select * FROM [Services]')
    res.json(result.recordset)
    }
    catch(err){
        res.status(500).send(err.message);
    }
}
);
app.get('/api/Payouts', async (req,res) => {
        try {
            const month = req.query.month;
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MonthParam',sql.Int,month)
                .query('SELECT * FROM dbo.GetMonthlyPayouts(@MonthParam)');
                res.json(result.recordset);
        }
        catch (err) {
            res.status(574).send(err.message);
        }
    }
);
app.delete('/api/DeleteShift/:id',async(req,res) =>{
    try {
        const ShiftID = req.params.id;
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ShiftID',sql.Int,ShiftID)
            .execute('dbo.DeleteShift');
        res.json({message :'Zmiana usunieta'});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
app.put('/api/UpdateShift',async(req,res) => {
    try {
        const {ShiftID,EmployeeID,RoomID,NewStartTime,NewDurationTime} = req.body;
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ShiftID',sql.Int,ShiftID)
            .input('EmployeeID',sql.Int,EmployeeID)
            .input('RoomID',sql.Int,RoomID)
            .input('NewStartTime',sql.DateTime,NewStartTime)
            .input('NewDurationTime',sql.Int,NewDurationTime)
            .execute('dbo.UpdateShift');
        res.json({message: "Shift updated successfully"});
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
});
app.get('/api/WorkShifts',async(req,res)=>{
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('Select * FROM WorkShifts');
        res.json(result.recordset);
    }
    catch(err){
        res.status(500).send(err.message);
    }
} );
app.post('/api/AddShift',async(req,res) => {
    try {
        const {EmployeeID,RoomID,StartTime,durationTime} = req.body;
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeID',sql.Int,EmployeeID)
            .input('RoomID',sql.Int,RoomID)
            .input('StartTime',sql.DateTime,StartTime)
            .input('durationTime',sql.Int,durationTime)
            .execute('dbo.AddShift');
            res.status(201).json({message : 'ShiftAdded'});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
app.post('/api/AddCustomer', async (req,res) =>{
    try {
        const {name,surname,pesel,email} = req.body;

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('name',sql.NvarChar,name)
            .input('surname',sql.NvarChar,surname)
            .input('pesel',sql.VarChar,pesel)
            .input('email',sql.NvarChar,emial)
            .execute('AddCustomer');
        res.status(201).json({message : "Customer added successfully"});
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
});
app.get('/api/Customers', async (req,res)=>{
   try {
       let pool = await sql.connect(config);
       let result = await pool.request().query('SELECT * FROM CUSTOMERS');
       res.json(result.recordset);
   }
   catch(err)
   {
       res.status(500).send(err.message);
   }
});
app.listen(5000, () => {
    console.log("✅ Serwer API wystartował na http://localhost:5000");
});