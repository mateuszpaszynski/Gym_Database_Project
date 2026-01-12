import React,{useEffect,useState} from 'react';
import  {uniwersalStyles,drawCalendar,classStyles} from './styles.js';
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

    const [month,setMonth] = useState(2);
    const [year,setYear] = useState(2026);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const [popup,setPopup] = useState({
        visible:false,
        x:0,
        y:0,
    });
    return (
        <div style = {{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent: 'flex-end',itemsAlign:'center',gap:'0px'}}>
            <div style = {uniwersalStyles.calendarMenu}>
                <header style ={{alignSelf:'flex-start',marginRight: 'auto',marginLeft:'1%',color:'white',marginTop:'0.5%'}}> {monthNames[month ]} {year}</header>
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
                        <button >Register</button>
                        <button onClick={() => setPopup({ ...popup, visible: false })}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Classes;
