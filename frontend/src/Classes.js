import React,{useEffect,useState} from 'react';
import  {uniwersalStyles,classStyles} from './styles.js';
import drawCalendar from './calendar.js'
function Classes()
{
    const [userID,setUserID] = useState("1");
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success',
        zIndex :100,
    });

    const [isEditing,setIsEditing] = useState(false);
    const [availableTrainers,setAvailableTrainers] = useState([]);
    const fetchTrainers = async(dateString) =>{

        const res = await fetch('http://localhost:5000/api/GetAvailableTrainers',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date: dateString})});
        const data = await res.json();
        console.log(data);
        setAvailableTrainers(data);
    };

    const [availableClasses,setAvailableClasses] = useState([]);
    useEffect(()=> {
            const fetchLookups = async () => {
                const res = await fetch('http://localhost:5000/api/GetClassTypes')
                const data = await res.json();
                setAvailableClasses(data);
            };
            fetchLookups();
        },[]);
    const [formData,setFormData] = useState({});
    const startEditing = () => {
        showNotification('Editing');
        setFormData({
            ScheduleID: popup.item.ScheduleID,
            ClassID: popup.item.ClassID,        // Ważne: ID, nie nazwa
            ClassName: popup.item.ClassName, // Do wyświetlania
            Max_slots: popup.item.Max_slots,
            Trainer: popup.item.Trainer,
            StartTime: popup.item.StartTime,    // Format: YYYY-MM-DDTHH:mm:ss
            durationTime: popup.item.durationTime

        });
        setIsEditing(true);
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleDelete = async(item) => {
        const registered = item.Registered;
        if (item.StartTime < today)
        {
            showNotification("You can't delete class from the past",'error');
            setPopup({...popup,visible:false});
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/DeleteClass/' + item.ScheduleID, {
                    method: 'DELETE',
                })
            if(response.ok)
            {
                let msg = 'Class Deleted';
                if ( registered)
                {
                    msg = msg + ' unregistered ' + registered + ' users';
                }
                showNotification(msg);
                setPopup({...popup,visible:false});
                getData();
                drawCalendar(month,year,classesLookup,setPopup);
            }
            else {
                showNotification('Server error','error');
            }
        }
        catch(err)
        {
            console.log(err.message);
        }

    };
    const handleSave = async() => {
        try {
            const response = await fetch('http://localhost:5000/api/UpdateClass',{
                method :'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                showNotification("Zaktualizowano!", "success");
                setIsEditing(false);
                setPopup({ ...popup, visible: false }); // Zamknij lub odśwież dane
                getData(); // Odśwież kalendarz
            } else {
                showNotification("Błąd aktualizacji", "error");
            }
        }
        catch(err)
        {
            console.log(err);
        }
    };
    const showNotification = (msg, type = 'success') => {
        setNotification({ show: true, message: msg, type });

        setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
        }, 3000);
    };
    const [dane,setDane] = useState([]);
    const getData = async() =>{
        try {
            const response = await fetch('http://localhost:5000/api/Classes')
            const data = await response.json();
            setDane(data);
        }
        catch(err)
        {
            console.error('Blad polaczenia');
        }
};
    useEffect(() => {getData() },[]);
    const classesLookup ={};
    for ( let i = 0;i<dane.length;i++) //ustawia slownik zajec potem wyszukiwanie O(1)
    {
       const d = new Date(dane[i].StartTime);
       const klucz = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

       if (!classesLookup[klucz])
       {
           classesLookup[klucz] = [];
       }
       classesLookup[klucz].push(dane[i]);
    }
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
            const response = await fetch(url
                ,
                {method : 'PUT'});
            if( response.ok)
            {
                showNotification("Registered successfully");
                setPopup({...popup,visible:false});
                getData();
                return;
            }
            switch(response.status) {
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
    return (
        <div style = {{width:'100%',height:'100%',display:'flex',flexDirection:'column',itemsAlign:'center',gap:'0px'}}>
            <div style = {uniwersalStyles.calendarMenu}>
                <header style ={{alignSelf:'flex-start',marginRight: 'auto',marginLeft:'0.5%',color:'white',marginTop:'0.5%'}}> {monthNames[month]} {year}</header>

                <button
                    onClick={()=> {setYear(month===0 ? year-1 : year) ;setMonth(month === 0 ? 11 : month-1)  }}
                    style = {uniwersalStyles.menuButton}>{"<"}</button>

                <button
                    onClick={()=>{setYear(month===11 ? year+1 : year) ; setMonth(month === 11 ? 0 : month+1)}}
                    style = {uniwersalStyles.menuButton}>{">"}</button>
            </div>

            <div style = {uniwersalStyles.gridContainer}>
                {
                    drawCalendar(month,year,classesLookup,setPopup,fetchTrainers)
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
                                            availableClasses.map((c)=>(<option>{c.ClassName}</option>))
                                        }
                                    </select> )

                                    : <span>{popup.item.ClassName}</span>
                                }
                                {isEditing ? (<select name="Trainer" value={formData.Trainer} onChange={handleChange}>

                                            {availableTrainers.map((t) => (<option>{t.Trainer}</option>)) }

                                    </select> )

                               : (<span>with: {popup.item.Trainer}</span>)
                                }
                                {isEditing? (<input type="number" name="durationTime" value ={formData.durationTime} onChange={handleChange} min={"15"} step="5"/>)   :

                                    (<span>duration: {popup.item.durationTime} minutes</span>)}



                            <span>at: {popup.item.time}</span>
                            <span>registered: {popup.item.Registered}/{popup.item.Max_slots}</span>


                        </div>
                        <button onClick={() => Register(popup.item)}>Register</button>
                        {userID === "1" ? <button onClick={()=>startEditing()}>Edit</button> : null}
                        {userID === "1" ? <button onClick={()=>handleDelete(popup.item)}>Delete</button>: null}
                        <button onClick={() => {setPopup({ ...popup, visible: false });setIsEditing(false);}}>Close</button>
                    </div>
                )}

            </div>
            {notification.show && (
                <div style={{
                    ...uniwersalStyles.notificationBox,
                    backgroundColor: notification.type === 'success' ? '#2ecc71' : '#e74c3c' // Zielony lub Czerwony
                }}>
                    <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
                    {notification.message}
                </div>
            )}
        </div>
    );

}


export default Classes;
