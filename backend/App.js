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
app.put('/api/RegisterForClass/:id', async(req,res)=> {
        try {
            const ScheduleID = req.params.id;
            const CustomerID = 1;
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('ScheduleID',sql.Int,ScheduleID)
                .input('CustomerID',sql.Int,CustomerID)
                .execute('dbo.RegisterForClass')
            res.status(201).json('Registered successfully')
        } catch (err) {

            if ( !err.message ) {

                return res.status(409).json({ message: "Brak wolnych miejsc na te zajęcia!" });
            }

            if (err.message.includes('PRIMARY KEY') || err.message.includes('Violation of PRIMARY KEY')) {
                return res.status(404).json({ message: "Już jesteś zapisany na te zajęcia." });
            }

            res.status(500).json({message: 'Błąd serwera: ' + err.message});
        }

    }
);
app.delete('/api/DeleteClass/:id',async(req,res)=>{
    try {
        const ScheduleID = req.params.id;
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('ScheduleID',sql.Int,ScheduleID)
            .execute('dbo.DeleteClass');
        res.status(202).json({message: 'Class Deleted'});
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
});
app.put('/api/UpdateClass',async(req,res) =>{
    try {
        const {ScheduleID,ClassID,Max_slots,EmployeeID,StartTime,durationTime} = req.body;
        let pool = await sql.connect(config);
        await pool.request()
            .input('ScheduleID',sql.Int,ScheduleID)
            .input('ClassID',sql.Int,ClassID)
            .input('Max_slots',sql.Int,Max_slots)
            .input('EmployeeID',sql.Int,EmployeeID)
            .input('StartTime',sql.DateTime,StartTime)
            .input('durationTime',sql.Int,durationTime)
            .execute(dbo.UpdateClass);
        res.status(200).json({message:"Class Updated"});

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message: err.message});
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