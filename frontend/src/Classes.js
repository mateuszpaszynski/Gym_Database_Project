import React,{useEffect,useState} from 'react';
import  {uniwersalStyles,classStyles} from './styles.js';
import drawCalendar from './calendar.js'
function Classes() {
    const [classForm, setClassForm] = useState({visible: false});
    const [userID, setUserID] = useState(1);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success',
        zIndex: 100,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [availableTrainers, setAvailableTrainers] = useState([]);
    const fetchTrainers = async (dateString) => {
        const res = await fetch('http://localhost:5000/api/GetAvailableTrainers',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date: dateString})
            });
        const data = await res.json();
        setAvailableTrainers(data);
    };
    const [availableClasses, setAvailableClasses] = useState([]);
    useEffect(() => {
        const fetchLookups = async () => {
            const res = await fetch('http://localhost:5000/api/GetClassTypes')
            const data = await res.json();
            setAvailableClasses(data);
        };
        fetchLookups();
    }, []);
    const [formData, setFormData] = useState({});
    const startEditing = () => {
        if (popup.item.StartTime < today) {
            showNotification("You can't edit classes that already happened", 'error');
            setPopup({...popup, visible: false});
            return;
        }
        showNotification('Editing');
        setFormData({
            ScheduleID: popup.item.ScheduleID,
            ClassID: popup.item.ClassID,        // Ważne: ID, nie nazwa
            ClassName: popup.item.ClassName, // Do wyświetlania
            Max_slots: popup.item.Max_slots,
            EmployeeID: popup.item.EmployeeID,
            Trainer: popup.item.Trainer,
            time: popup.item.time,    // Format: YYYY-MM-DDTHH:mm:ss
            durationTime: popup.item.durationTime,
            StartTime: popup.item.StartTime
        });
        setIsEditing(true);
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleDelete = async (item) => {
        const registered = item.Registered;
        if (item.StartTime < today) {
            showNotification("You can't delete class from the past", 'error');
            setPopup({...popup, visible: false});
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/DeleteClass/' + item.ScheduleID, {
                method: 'DELETE',
            })
            if (response.ok) {
                let msg = 'Class Deleted';
                if (registered) {
                    msg = msg + ' unregistered ' + registered + ' users';
                }
                showNotification(msg);
                setPopup({...popup, visible: false});
                getData();
                drawCalendar(month, year, classesLookup, setPopup);
            } else {
                showNotification('Server error', 'error');
            }
        } catch (err) {
            console.log(err.message);
        }

    };
    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/UpdateClass', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                showNotification("Zaktualizowano!", "success");
                setIsEditing(false);
                setPopup({...popup, visible: false}); // Zamknij lub odśwież dane
                getData(); // Odśwież kalendarz
            } else {
                console.log(response);
                showNotification("Błąd aktualizacji", "error");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const showNotification = (msg, type = 'success') => {
        setNotification({show: true, message: msg, type});

        setTimeout(() => {
            setNotification((prev) => ({...prev, show: false}));
        }, 3000);
    };
    const [dane, setDane] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Classes')
            const data = await response.json();
            console.log("tutaj sa dane: ", data);
            setDane(data);

        } catch (err) {
            console.error('Blad polaczenia');
        }
    };
    useEffect(() => {
        getData()
    }, []);
    const classesLookup = {};
    for (let i = 0; i < dane.length; i++) //ustawia slownik zajec potem wyszukiwanie O(1)
    {
        const d = new Date(dane[i].StartTime);
        const klucz = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

        if (!classesLookup[klucz]) {
            classesLookup[klucz] = [];
        }
        classesLookup[klucz].push(dane[i]);
    }
    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        const dateOnly = formData.StartTime.split('T')[0];
        const newStartTime = `${dateOnly}T${newTime}:00`;
        setFormData({
            ...formData,
            time: newTime,
            StartTime: newStartTime,
        })
    }
    const AddClass = async () => {
        formData.StartTime = `${classForm.item}T${formData.time}:00`;
        try {
            const response = await fetch('http://localhost:5000/api/AddClass',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
            if (response.ok) {
                showNotification("Class Added!", "success");
                setClassForm({...classForm, visible: false});
                getData();
            } else {
                console.log(response);
                showNotification("Server Error", "error");
            }
        }
catch
    (err)
    {
        console.log(err);
    }
};
    const Register = async (item) => {
        if (item.StartTime < today)
        {
            showNotification("You can't register for classes in the past",'error');
            setPopup({...popup,visible:false});
            return;
        }
        const idZajec = item.ScheduleID;
        const url =  'http://localhost:5000/api/RegisterForClass/' + idZajec;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                // 1. Musisz powiedzieć, że wysyłasz JSON
                headers: {
                    'Content-Type': 'application/json'
                },
                // 2. Musisz zamienić dane na napis JSON i użyć klucza "CustomerID"
                body: JSON.stringify({
                    CustomerID: userID
                })
            });
            if( response.ok)
            {
                showNotification("Registered successfully");
                setPopup({...popup,visible:false});
                getData();
                return;
            }
            switch(response.status) {
                case 422:
                    showNotification("Employees dont have to register for classes");
                    setPopup({...popup,visible:false});
                    break;
                case 409:
                    showNotification("Class full","error");
                    setPopup({...popup,visible:false});
                    break;
                case 404:
                showNotification("You have already registered for this class!","error");
                    setPopup({...popup,visible:false});
                break;
                default :
                    showNotification("Server error","error");
                    setPopup({...popup,visible:false});

            }}
        catch(err){
            console.log("Blad sieci",err);
        }
    }
    const [month,setMonth] = useState(0);
    const [year,setYear] = useState(2026);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const [popup,setPopup] = useState({
        visible:false,
        x:0,
        y:0,
    });
    const today = new Date().toISOString().split('T')[0];
    const generateTimeOptions = (startHour, endHour, stepMinutes) => {
        const options = [];
        for (let hour = startHour; hour < endHour; hour++) {
            for (let min = 0; min < 60; min += stepMinutes) {
                const h = hour.toString().padStart(2, '0');
                const m = min.toString().padStart(2, '0');
                const timeString = `${h}:${m}`;
                options.push(timeString);
            }
        }
        options.push(`${endHour}:00`)
        return options;
    };
    const timeOptions = generateTimeOptions(10, 20, 15);
    return (
        <div style = {{width:'100%',height:'100%',display:'flex',flexDirection:'column',itemsAlign:'center',gap:'0px'}}>
            <div style = {uniwersalStyles.calendarMenu}>
                <header style ={{alignSelf:'flex-start',marginRight: 'auto',marginLeft:'0.5%',color:'white',marginTop:'0.5%'}}> {monthNames[month]} {year}</header>
                <button onClick={()=>setUserID(1)} style={userID === 1? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Admin</button>
                <button onClick={()=>setUserID(20)} style ={userID === 20? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>User</button>
                <button
                    onClick={()=> {setYear(month===0 ? year-1 : year) ;setMonth(month === 0 ? 11 : month-1)  }}
                    style = {uniwersalStyles.menuButton}>{"<"}</button>

                <button
                    onClick={()=>{setYear(month===11 ? year+1 : year) ; setMonth(month === 11 ? 0 : month+1)}}
                    style = {uniwersalStyles.menuButton}>{">"}</button>
            </div>
            <div style = {uniwersalStyles.gridContainer}>
                {
                    drawCalendar(month,year,classesLookup,setPopup,fetchTrainers,setClassForm,userID)
                }
                {
                        classForm.visible && (<div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 'auto',
                        width: '200px',
                        border: '2px solid black',
                        backgroundColor: 'rgba(245, 235, 235, 1)',
                        position: 'fixed',
                        zIndex: 2000    }}>
                        <label>ClassID</label>
                        <select name="ClassID" value={formData.ClassID} onChange={handleChange}>
                            {
                                availableClasses.map((c)=>(<option key={c.ClassID} value={c.ClassID}>{c.ClassName}</option>))
                            }
                        </select>
                        <label>EmployeeID</label>
                        <select name="EmployeeID" value={formData.EmployeeID} onChange={handleChange}>
                            {
                                    availableTrainers.map((t) => (<option key={t.ID} value={t.ID}>
                                    {t.Trainer}</option>))
                            }
                        </select>
                        <label>durationTime</label>
                        <input type="number"  name="durationTime" value={formData.durationTime} min="45" max="120" step="5" onChange={handleChange}></input>
                        <label>StartTime</label>
                        <select name="time" value={formData.time} onChange={handleChange}>
                        {
                            timeOptions.map((t)=>(<option>{t}</option>))
                        }
                    </select>
                        <label>Max_slots</label>
                        <input type="number" name="Max_slots" value = {formData.Max_slots} min="10" max="25" step="1" onChange={handleChange}></input>
                        <button style={{justifySelf:'flex-end'}} onClick={AddClass}>Add Class</button>
                        <button style={{justifySelf:'flex-end'}}  onClick={()=>{setClassForm({visible:false})}}>Close</button>
                    </div>)
                }
                {
                    popup.visible && (<div style={{...popup ,...classStyles[popup.item.ClassID],justifyContent:'flex-start',flexDirection:'column',
                            left: popup.x,
                            top: popup.y,
                            position:'fixed',
                            padding:'3px',
                            width:'auto'}}>
                            <div style = {{display:'flex',flexDirection:'column',marginLeft:'2px'}}>
                                {isEditing ? (
                                    <select name="ClassID" value={formData.ClassID} onChange={handleChange}>
                                        {
                                            availableClasses.map((c)=>(<option key={c.ClassID} value={c.ClassID}>{c.ClassName}</option>))
                                        }
                                    </select>
                                    ) : <span>{popup.item.ClassName}</span>}
                                {isEditing ? (
                                    <select name="EmployeeID" value={formData.EmployeeID} onChange={handleChange}>
                                            {
                                                availableTrainers.map((t) => (<option key={t.ID} value={t.ID}>
                                                {t.Trainer}</option>)) }
                                    </select>
                                    ) : (<span>with: {popup.item.Trainer}</span>)}
                                {isEditing? (
                                    <input type="number" name="durationTime" value ={formData.durationTime} onChange={handleChange} min={"45"} max={"120"} step="5"/>)   :
                                    (<span>duration: {popup.item.durationTime} minutes</span>)}
                                {isEditing? (<select name="time" value={formData.time} onChange={handleTimeChange}>
                                        {
                                            timeOptions.map((t)=>(<option>{t}</option>))
                                        }
                                    </select>):(<span>at: {popup.item.time}</span>)}
                                { isEditing? (<input type="number" name="Max_slots" value={formData.Max_slots} onChange={handleChange} min={"10"} max={"25"} step="1"/>)
                                    :(<span>registered: {popup.item.Registered}/{popup.item.Max_slots}</span>)
                                }
                        </div>
                            {isEditing? <button onClick={handleSave}>Save</button>: null}
                            { userID!== 1 ? (!isEditing? <button onClick={() => Register(popup.item)}>Register</button> : null) : null }
                            {!isEditing? (userID === 1 ? <button onClick={()=>startEditing()}>Edit</button> : null) : null }
                        {!isEditing? (userID === 1 ? <button onClick={()=>handleDelete(popup.item)}>Delete</button>: null):null}
                        <button onClick={() => {setPopup({ ...popup, visible: false });setIsEditing(false);}}>Close</button>
                    </div>
                )}
            </div>
            {notification.show && (
                <div style={{
                    ...uniwersalStyles.notificationBox,
                    backgroundColor: notification.type === 'success' ? '#2ecc71' : '#e74c3c'
                }}>
                    <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
                    {notification.message}
                </div>
            )}
        </div>
    );
}
const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    width: '100%'
};
const labelStyle = {
    width: '120px',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: '5px'
};
const inputStyle = {
    flex: 1,
    padding: '5px'
};
export default Classes;
