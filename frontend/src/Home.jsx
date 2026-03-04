import React, { useEffect, useState } from 'react';
function Home({setWidok}){
        return (
            <div style ={styles.glassCard}>
                    <header style ={styles.title}> Achieve Your Goals.</header>
                    <header style={styles.subtitle}>Why Choose Us?</header>
                    <header style ={styles.subtitle}>BECAUSE WE ARE MORE THAN JUST A GYM</header>
                    We believe in variety. That’s why every pass includes unlimited access to <div style={styles.button} onClick={()=>setWidok('Classes')}>our scheduled
                    group activities. </div><br/>Whether you're into high-intensity interval training, yoga, or pilates,
                    our professional instructors are here to guide you.
                <br />
                    ✅ Free Group Classes with Every Pass
                <br />
                    ✅ State-of-the-art Equipment
                <br />
                    ✅ Flexible Membership Options
                <br/>
                <text style ={styles.spanAccent}>Join the community where fitness meets passion. Get full access to our gym floor and all group
                    classes included in your membership – no hidden fees.</text>
                </div>
        );

}
const styles = {

    glassCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Ciemne tło, 75% krycia
        backdropFilter: 'blur(10px)',           // ROZMYCIE TEGO CO POD SPODEM (Efekt szkła)
        padding: '50px',
        borderRadius: '20px',                   // Zaokrąglone rogi
        border: '1px solid rgba(255, 255, 255, 0.1)', // Delikatna ramka
        textAlign: 'center',
        //maxWidth: '1200px',
        width: '100%',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', // Cień pod spodem dla głębi
        color: 'white',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        margin: '0 0 10px 0',
        textTransform: 'uppercase', // Wielkie litery
        letterSpacing: '2px',
        lineHeight: '4rem',
    },
    spanAccent: {
        color: '#2ecc71', // Twój zielony (lub zmień na #ff0055)
        marginBottom:'10px',
    },
    subtitle: {
        fontSize: '2rem',
        color: '#cccccc', // Lekko szary dla mniejszego tekstu
        marginBottom: '10px',
        lineHeight: '4rem',
    },
    button: {
        alignSelf:'center',
        justifySelf:'center',
        marginTop:'10px',
        padding: '20px 40px',
        textColor :'blue',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'white',
        border: 'none',
        maxWidth:'200px',
       borderRadius: '50px', // Pastylka
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 15px rgba(46, 204, 113, 0.4)', // Świecący cień
    }
};
export default Home;