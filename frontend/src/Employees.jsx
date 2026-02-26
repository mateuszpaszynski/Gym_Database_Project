import React, { useEffect, useState } from 'react';
function Employees(){
    const [dane,setDane] = useState([]);
    const getData = async() =>{
        try {
            const response = await fetch('http://localhost:5000/api/Services');
            const data = await response.json();
            setDane(data);
        } catch(error)
        {
            console.error("Blad polaczenia",error);
        }
    }



    return (
        <div>

        </div>
    );

}
export default Employees;