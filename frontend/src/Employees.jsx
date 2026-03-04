import React, { useEffect, useState } from 'react';
function Employees(){
    const [dane,setDane] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    const getData = async() =>{
        try {
            const response = await fetch('http://localhost:5000/api/Employees');
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
                     <tr key ={person.ID}>
                         <td style = {styles.td}>{person.ID}</td>
                         <td style = {styles.td}>{person.Name}</td>
                         <td style = {styles.td}>{person.Surname}</td>
                         <td style = {styles.td}>{person.Email ? person.Email : '-'}</td>
                         <td style = {styles.td}>{person.Login ? person.Login : '-'}</td>
                         <td style = {styles.td}>{person.Role ? person.Role : 0 }</td>
                         <td style = {styles.td}>{person.JobTitle}</td>
                         <td style = {styles.td}>{person.HireDate ? person.HireDate.split('T')[0] : ' - '}</td>
                         <td style = {styles.td}>{person.HourlySalary ? person.HourlySalary+' zł/h' : null}</td>
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