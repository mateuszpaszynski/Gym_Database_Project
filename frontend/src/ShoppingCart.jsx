import React, { useState,useEffect } from 'react';
function ShoppingCart()
{
    return (
        <div style = {{display:'flex'}}>
            <div style={styles.glassContainer} className="glass-container">
                <div style ={{...styles.tableHeader}}>
                    ITEM
                </div>
                <div style ={{padding: '20px 30px',color:'grey'}}>
                    DESCRIPTION
                </div>
                <div style ={{...styles.tableHeader}}>
                    PRICE
                </div>
            </div>
        </div>

    );
}
export default ShoppingCart;
const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        color: '#ffffff',
    },
    tableHeader: {
        display:'flex',
        position: 'sticky',
        textAlign: 'center',
        padding: '20px 30px',
        color: '#ffcc00', // Złoty/żółty kolor fajnie kontrastuje z hantlami
        fontSize: '14px',
        textTransform: 'uppercase', // Wielkie litery
        letterSpacing: '1px',       // Większe odstępy między literami
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)', // Linia pod nagłówkiem
        fontWeight: 'bold'
    },
    glassContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        display:'flex',
        justifyContent:'space-between',

        // KLUCZOWE ZMIANY:
        minWidth:'72vw',
        maxHeight: '600px',       // Ustawiasz sztywną wysokość okna
        overflowY: 'auto',        // Pojawi się suwak, gdy danych będzie za dużo
        overflowX: 'hidden',      // Blokujemy suwak poziomy

        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
    },
}