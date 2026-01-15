import React,{useEffect,useState} from 'react';
import  {uniwersalStyles,classStyles} from './styles.js';
import drawCalendar from './calendar.js'
function Classes()
{
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
        const idZajec = item.ScheduleID;
        const url =  'http://localhost:5000/api/RegisterForClass/' + idZajec;
        try {
            const response = await fetch(url
                ,
                {method : 'PUT'});
            if( response.ok)
            {
                alert("Registered");
                setPopup({...popup,visible:false});
                getData();
            }
            else {
                const errorText = await response.text();
                alert("Błąd zapisu :" + errorText);

            }}
        catch(err){
            console.log("Blad sieci",err);
        }
    }
    const [month,setMonth] = useState(2);
    const [year,setYear] = useState(2026);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const [popup,setPopup] = useState({
        visible:false,
        x:0,
        y:0,
    });
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
                    drawCalendar(month,year,classesLookup,setPopup)
                }
                {
                    popup.visible && (<div style={{...popup ,...classStyles[popup.item.ClassID],justifyContent:'flex-start',flexDirection:'column',
                            top: popup.y - 40,
                            position:'fixed',
                            left: popup.x,
                            width:'auto'}}>
                            <div style = {{whiteSpace: 'pre-wrap',marginLeft:'2px'}}>
                                 {`${popup.item.ClassName}
                                 
With: ${popup.item.Name} ${popup.item.Surname}
duration: ${popup.item.durationTime} minutes
at: ${popup.item.time}
registered: ${popup.item.Registered}/${popup.item.Max_slots}
                                `
                                }
                        </div>
                        <button onClick={() => Register(popup.item)}>Register</button>
                        <button onClick={() => setPopup({ ...popup, visible: false })}>Close</button>
                    </div>
                )}
            </div>

        </div>
    );
}


export default Classes;
