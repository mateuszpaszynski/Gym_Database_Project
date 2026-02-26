import React, { useState } from 'react';
import Home from './Home.jsx'
import Classes from './Classes.jsx'
import Offer from "./Offer.jsx"
import {uniwersalStyles} from "./styles"
import Login from "./Login.jpg"

function App() {
    const [widok,setWidok] = useState('Home');
    return (
        <div style = {uniwersalStyles.desktopContainer}>
                <nav  style = {uniwersalStyles.menuContainer}>
                    <button
                        onClick={()=>setWidok('Home')}
                        style = {widok === 'Home' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>HOME</button>
                    <button
                        onClick={()=>setWidok('Offer')}
                        style = {widok === 'Offer' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>OFFER</button>

                    <div style = {{display:'flex',justifyContent:'space-between'}}>
                        <button
                            onClick={()=>setWidok('Classes')}
                            style = {widok === 'Classes' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Classes</button>
                        <img src="/images/shoppingCart.svg" alt="shoppingCart" style={{...uniwersalStyles.menuButton, justifySelf:'flex-end'}}/>
                        <img src="/images/login.svg" alt ="Login" style = {uniwersalStyles.menuButton}/>
                    </div>

                </nav>
                <main style={{
                    zIndex: 7,
                    left: '3%',
                    width: '94%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                {widok === 'Home'      &&  <Home onNavigate={setWidok}/>}
                {widok === 'Offer'     &&  <Offer onNavigate={setWidok}/>}
                {widok === 'Classes' &&  <Classes/>}

            </main>
        </div>
    );}

export default App;