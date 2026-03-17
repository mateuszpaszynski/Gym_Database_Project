import React, { useEffect, useState } from 'react';
function Offer(){
    const url = import.meta.env.VITE_API_URL
    const [dane,setDane] = useState([]);
    const getData = async () =>{
        try {
            const response = await fetch(`${url}/Services`);
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
                        <div style ={styles.itemTitle}> {s.servicename}</div>
                        <div style = {styles.itemDesc}>{s.price} zł</div>

                    </div>)
                }

            </div>
        </div>
    );
}
const styles = {
    glassCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '50px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '1200px',
        width: '100%',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        color: 'white',
        display:'flex',
        flexDirection:'column',
    },

    Header: {
        color: 'white',
        fontSize: '3rem',
        fontWeight: '800',
        marginTop: '0',
        marginBottom: '40px',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        borderBottom: '3px solid #2ecc71',
        paddingBottom: '10px',
        width: '100%',
        justifySelf:'flex-start',
        alignSelf:'flex-start'
    },

    offerGrid: {
        display: 'flex',
        gap: '20px',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '40px',
    },

    offerItem: {
        display:'flex',
        flexDirection:'column',
        flex: '1',
        minWidth: '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '20px',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        cursor: 'default',
    },
    icon: {
        fontSize: '3rem',
        marginBottom: '10px',
        display: 'block',
    },
    itemTitle: {
        color: '#2ecc71',
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