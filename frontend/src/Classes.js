import React,{useEffect,useState} from 'react';
import uniwersalStyles, {drawCalendar} from "./styles";
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
    for ( let i = 0;i<dane.length;i++)
    {
       const d = new Date(dane[i].StartTime);
       console.log('Nalesnik');
       const klucz = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
       console.log(klucz);
       if (!classesLookup[klucz])
       {
           classesLookup[klucz] = [];
       }
       classesLookup[klucz].push(dane[i]);
    }


    const [month,setMonth] = useState(2);
    const [year,setYear] = useState(2026);
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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
                    drawCalendar(month,year,classesLookup)
                }
            </div>
        </div>
    );
}
const styles ={
    Header:{
        color:'black',
        fontSize: '5vw',
        lineHeight :'0',
    },
    table :{
        display: 'flex',
        justifyContent:'center',
        flexDirection: 'row',

    },
    container:{},
};
export default Classes;
