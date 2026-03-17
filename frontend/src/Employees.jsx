import React, { useEffect, useState } from 'react';
function Employees(){
    const url = import.meta.env.VITE_API_URL
    const [dane,setDane] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    const getData = async() =>{
        try {
            const response = await fetch(`${url}/Employees`);
            const data = await response.json();
            setDane(data);
        } catch(error)
        {
            console.error("Blad polaczenia",error);
        }
    }
    console.log(dane);
        return (
            <div style={styles.glassContainer} className="glass-container">
            <table style = {styles.table}>
                <thead>
                <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>IMIE</th>
                    <th style={styles.tableHeader}>NAZWISKO</th>
                    <th style={styles.tableHeader}>EMAIL</th>
                    <th style={styles.tableHeader}>LOGIN</th>
                    <th style={styles.tableHeader}>ROLE</th>
                    <th style={styles.tableHeader}>JOB TITLE</th>
                    <th style={styles.tableHeader}>HIRE DATE</th>
                    <th style={styles.tableHeader}>SALARY</th>
                </tr>
                </thead>
                <tbody>
                {
                     dane.length > 0 ?
                 (dane.map((person)=>(
                     <tr key ={person.id}>
                         <td style = {styles.td}>{person.id}</td>
                         <td style = {styles.td}>{person.name}</td>
                         <td style = {styles.td}>{person.surname}</td>
                         <td style = {styles.td}>{person.email ? person.email : '-'}</td>
                         <td style = {styles.td}>{person.login ? person.login : '-'}</td>
                         <td style = {styles.td}>{person.role ? person.role : 0 }</td>
                         <td style = {styles.td}>{person.jobtitle}</td>
                         <td style = {styles.td}>{person.hiredate ? person.hiredate.split('T')[0] : ' - '}</td>
                         <td style = {styles.td}>{person.hourlysalary ? person.hourlysalary+' zł/h' : null}</td>
                    </tr>
                 ))) : null
                }
                </tbody>
            </table>
            </div>
                );
}
const styles = {
    glassContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',

        // KLUCZOWE ZMIANY:
        maxHeight: '600px',       // Ustawiasz sztywną wysokość okna
        overflowY: 'auto',        // Pojawi się suwak, gdy danych będzie za dużo
        overflowX: 'hidden',      // Blokujemy suwak poziomy

        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
    },
    tr: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Lekkie podświetlenie wiersza
        transition: 'all 0.3s ease',
    },

    // Styl komórki (td)
    td: {
        textAlign: 'center',
        padding: '15px',
        fontSize: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        verticalAlign: 'middle',
    },
    tableHeader: {
        position: 'sticky',
        textAlign: 'center',
        padding: '12px 15px',
        color: '#ffcc00', // Złoty/żółty kolor fajnie kontrastuje z hantlami
        fontSize: '14px',
        textTransform: 'uppercase', // Wielkie litery
        letterSpacing: '1px',       // Większe odstępy między literami
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)', // Linia pod nagłówkiem
        fontWeight: 'bold'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        color: '#ffffff',

    }
}
export default Employees;