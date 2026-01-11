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
    const [month,setMonth] = useState(3);
    const days =[];
    const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return (
        <div style = {{border :'2px solid green',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent: 'center',itemsAlign:'center'}}>
            <div style = {uniwersalStyles.calendarMenu}>

            </div>
            <div style = {uniwersalStyles.gridContainer}>
                {
                    drawCalendar(0)
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
