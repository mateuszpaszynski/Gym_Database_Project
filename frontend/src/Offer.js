import React, { useEffect, useState } from 'react';
function Offer(){
    const [dane,setDane] = useState([]);
    const getData = async () =>{
        try {
            const response = await fetch('http://localhost:5000/api/Services');
            const data = await response.json();
            setDane(data);
        } catch(error)
        {
            console.error("Blad polaczenia",error);
        }
    };
    useEffect(() => {
        getData();
    },[]);
    console.log(dane);
    return (
        <div style={{display:'flex',flexDirection:' column',alignItems: 'center',justifyContent:'flexStart',width:'100%',zIndex: 4,color :'white'}}>
            <h2 style ={styles.Header}>OUR OFFER</h2>
            <table border="1" style ={{width:'50%',zIndex: 7,border:'transparent',backgroundColor: 'rgba(30, 7, 0, 0.7)'}}>
                <thead>
                <tr>
                    <th>ServiceName</th>
                    <th>Price</th>
                </tr>
                </thead>
            <tbody >{
                dane.map((u) => (<tr key = {u.ServiceID}>
                <td>{u.ServiceName}</td>
                <td style = {styles.table}>{u.Price} zł</td>
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

export default Offer;