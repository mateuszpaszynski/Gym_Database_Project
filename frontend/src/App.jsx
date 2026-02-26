import React, { useState } from 'react';
import Home from './Home.jsx'
import Classes from './Classes.jsx'
import Offer from "./Offer.jsx"
import Login from "./Login"
import {uniwersalStyles} from "./styles"
export const ROLES ={
    USER: 0,
    EMPLOYEE: 1,
    ADMIN: 2,
}
function App() {

    const [widok,setWidok] = useState('Login');
    const [userRole,setUserRole] = useState(ROLES.USER);
    return (
        <div style = {uniwersalStyles.desktopContainer}>
                <nav  style = {uniwersalStyles.menuContainer}>
                    <button onClick={()=>setWidok('Home')} style = {widok === 'Home' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>HOME</button>
                    <button onClick={()=>setWidok('Offer')} style = {widok === 'Offer' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>OFFER</button>
                    {
                        userRole > ROLES.USER ? <>
                        <button onClick={()=>setWidok('Customers')} style = {widok === 'Customers' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>CUSTOMERS</button>
                        {
                            userRole === ROLES.ADMIN ? <>
                            <button onClick={()=>setWidok('Employees')} style = {widok==='Employees'? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>EMPLOYEES</button>
                            <button onClick={()=>setWidok('Shifts')} style = {widok === 'Shifts' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>SHIFTS</button>
                            </> : null
                        }
                    </>: null
                    }
                    <div style = {{display:'flex',justifyContent:'space-between'}}>
                        <button onClick={()=>setWidok('Classes')} style = {widok === 'Classes' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Classes</button>
                        <img src={widok === 'Shopping Cart' ?"/images/clickedShoppingCart.svg" : "/images/shoppingCart.svg" } alt="ShoppingCart" onClick={()=>setWidok('Shopping Cart')} style = {{...uniwersalStyles.menuButton,height:'4vw'}}/>
                        <img src={widok === 'Login' ? "/images/clickedLogin.svg" : "/images/login.svg"} alt ="Login" onClick={()=>setWidok('Login')} style = {{...uniwersalStyles.menuButton,height:'4vw'}}/>


                    </div>

                </nav>
                <main style={{
                    zIndex: 7,
                    //left: '0%',
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{display: widok === 'Home' ? 'flex' : 'none', width: '100%', height: '100%'}}>
                        <Home onNavigate={setWidok}/>
                    </div>
                    <div style={{display: widok === 'Offer' ? 'flex' : 'none', width: '100%', height: '100%'}}>
                        <Offer onNavigate={setWidok}/>
                    </div>
                    <div style={{display: widok === 'Classes' ? 'flex' : 'none', width: '100%', height: '100%'}}>
                        <Classes onNavigate={setUserRole}/>
                    </div>
                    <div style={{display: widok === 'Login' ? 'flex' : 'none', width: '100%', height: '100%'}}>
                        <Login onNavigate={setUserRole}/>
                    </div>


            </main>
        </div>
    );}

export default App;
