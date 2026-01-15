import React, { useEffect, useState } from 'react';
import Home from './Home.js'
import Classes from './Classes.js'
import Customers from './Customers.js'
import Shifts from './Shifts.js'
import Employees from "./Employees.js";
import Offer from "./Offer.js"
import {uniwersalStyles} from "./styles"


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
                    <button
                        onClick={()=>setWidok('Classes')}
                        style = {widok === 'Classes' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Classes</button>
                    {/*  <button
                        onClick={()=>setWidok('Employees')}
                        style = {widok === 'Employees' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Employees</button>

                    <button
                        onClick={()=>setWidok('Shifts')}
                        style = {widok === 'Shifts' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Shifts</button>
                        */}
                </nav>
                <main style={{
                    zIndex: 7,
                    left: '3%',
                    width: '94%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                {widok === 'Home'      &&  <Home/>}
                {widok === 'Offer'     &&  <Offer/>}
                {widok === 'Classes' &&  <Classes/>}
            </main>
        </div>
    );}

export default App;