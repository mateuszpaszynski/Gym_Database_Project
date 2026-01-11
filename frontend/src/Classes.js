import React,{useEffect,useState} from 'react';
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
    console.log(dane);
    return (
        <div style={{display:'flex',flexDirection:' column',alignItems: 'center',justifyContent:'flexStart',width:'100%',zIndex: 4,color :'white'}}>
            <h2 style ={styles.Header}>OUR OFFER</h2>
            <table border="1" style ={{width:'70%',zIndex: 7,border:'transparent',backgroundColor: 'rgba(30, 7, 0, 0.7)'}}>
                <thead>
                <tr>
                    <th>Class</th>
                    <th>capacity</th>
                    <th>With</th>
                    <th>At</th>
                    <th>for</th>
                </tr>
                </thead>
                <tbody >{
                    dane.map((u) => (<tr key = {u.ScheduleID}>
                        <td>{u.ClassName}</td>
                        <td>{u.Registered}/{u.Max_slots}</td>
                        <td>{u.Name} {u.Surname}</td>
                        <td>{u.StartTime}</td>
                        <td>{u.durationTime} minutes</td>

                    </tr>))
                }
                </tbody>
            </table>
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
