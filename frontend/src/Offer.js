import React, { useEffect, useState } from 'react';
function Offer({onNavigate}){
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
    return (
        <div style={styles.glassCard}>
            <h2 style={styles.Header}>OUR OFFER</h2>

            <div style={styles.offerGrid}>
                {
                    dane.map((s)=><div style ={styles.offerItem} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}>
                        <div style ={styles.itemTitle}> {s.ServiceName}</div>
                        <div style = {styles.itemDesc}>{s.Price}.00 zł</div>

                    </div>)
                }

            </div>
        </div>
    );
}
const styles = {
    glassCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Ciemne tło, 75% krycia
        backdropFilter: 'blur(10px)',           // ROZMYCIE TEGO CO POD SPODEM (Efekt szkła)
        padding: '50px',
        borderRadius: '20px',                   // Zaokrąglone rogi
        border: '1px solid rgba(255, 255, 255, 0.1)', // Delikatna ramka
        //textAlign: 'center',
        maxWidth: '1200px',
        width: '100%',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', // Cień pod spodem dla głębi
        color: 'white',
        display:'flex',
        flexDirection:'column',
    },

    Header: {
        color: 'white',
        fontSize: '3rem',       // Trochę mniejszy niż 5vw, bardziej elegancki
        fontWeight: '800',
        marginTop: '0',         // Kasujemy margines góry
        marginBottom: '40px',   // Odstęp od kafelków
        textTransform: 'uppercase',
        letterSpacing: '3px',
        borderBottom: '3px solid #2ecc71', // Zielona linia pod napisem dla stylu
        paddingBottom: '10px',
        width: '100%',
        justifySelf:'flex-start',
        alignSelf:'flex-start'// Żeby linia była na całą szerokość (opcjonalne)
    },

    // Kontener na kafelki
    offerGrid: {
        display: 'flex',
        gap: '20px',            // Odstępy między kafelkami
        width: '100%',
        justifyContent: 'space-between', // Rozstrzel kafelki
        flexWrap: 'wrap',       // Żeby na telefonie spadły pod siebie
        marginBottom: '40px',   // Odstęp od przycisku na dole
    },

    // Pojedynczy kafelek
    offerItem: {
        display:'flex',
        flexDirection:'column',
        flex: '1',              // Każdy zajmuje tyle samo miejsca
        minWidth: '150px',      // Minimalna szerokość
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Bardzo delikatne tło (jaśniejsze od głównego)
        padding: '20px',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',    // W środku kafelka tekst wyśrodkowany
        transition: 'all 0.3s ease', // Do animacji najechania
        cursor: 'default',
    },
    icon: {
        fontSize: '3rem',       // Duża ikona/emoji
        marginBottom: '10px',
        display: 'block',
    },
    itemTitle: {
        color: '#2ecc71',       // Zielony tytuł
        fontWeight: 'bold',
        fontSize: '1.1rem',
        marginBottom: '10px',
        textTransform: 'uppercase',
    },
    itemDesc: {

        justifySelf:'flex-end',
        fontWeight:'700',
        color: '#ccc',
        fontSize: '0.9rem',
        lineHeight: '1.4',
    }
};
export default Offer;