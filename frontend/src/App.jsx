import React, { useState,useEffect } from 'react';
import Home from './Home.jsx'
import Classes from './Classes.jsx'
import Offer from "./Offer.jsx"
import Customers from "./Customers"
import Employees from "./Employees"
import Login from "./Login"
import ShoppingCart from "./ShoppingCart";
import {uniwersalStyles} from "./styles"
export const ROLES ={
    GUEST: 0,
    USER: 1,
    EMPLOYEE: 2,
    ADMIN: 3,
}
function App() {
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success',
        zIndex: 100,
        alignSelf:'flex-start',
        justifySelf:'flex-start'
    });
    const [userName,setUserName]= useState("LOG IN");
    const [ currentUser,setCurrentUser] = useState(null);
    const [widok,setWidok] = useState('Customers');
    useEffect( () => {
        const savedUser = localStorage.getItem('gymUser');
        if (savedUser && savedUser!=="undefined") {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            setUserName(user.name);
        }
    },[]);
    const showNotification = (msg, type = 'success') => {
        setNotification({show: true, message: msg, type});

        setTimeout(() => {
            setNotification((prev) => ({...prev, show: false}));
        }, 3000);
    };
    return (
        <div style = {uniwersalStyles.desktopContainer}>
                <nav  style = {uniwersalStyles.menuContainer}>
                    <button onClick={()=>setWidok('Home')} style = {widok === 'Home' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>HOME</button>
                    <button onClick={()=>setWidok('Offer')} style = {widok === 'Offer' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>OFFER</button>
                    {
                        currentUser?.role > ROLES.USER ? <>
                        <button onClick={()=>setWidok('Customers')} style = {widok === 'Customers' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>CUSTOMERS</button>
                        {
                            currentUser?.role === ROLES.ADMIN ? <>
                            <button onClick={()=>setWidok('Employees')} style = {widok==='Employees'? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>EMPLOYEES</button>
                            {/*<button onClick={()=>setWidok('Shifts')} style = {widok === 'Shifts' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>SHIFTS</button>*/}
                            </> : null
                        }
                    </>: null
                    }
                    <div style = {{display:'flex',justifyContent:'space-between'}}>
                        <button onClick={()=>setWidok('Classes')} style = {widok === 'Classes' ? uniwersalStyles.activeButton : uniwersalStyles.menuButton}>Classes</button>
                        <img src={widok === 'Shopping Cart' ?"/images/clickedShoppingCart.svg" : "/images/shoppingCart.svg" } alt="ShoppingCart" onClick={()=>setWidok('Shopping Cart')} style = {{...uniwersalStyles.menuButton,marginTop:'2px',height:'4.5vw'}}/>
                        <div style ={{display:'flex',flexDirection:'column'}}>
                            <img src={widok === 'Login' ? "/images/clickedLogin.svg" : "/images/login.svg"} alt ="Login" onClick={()=>setWidok('Login')} style = {{...uniwersalStyles.menuButton,height:'4vw'}}/>
                            <text style = {{color:'white',alignSelf:'center'}}>{userName}</text>
                        </div>

                    </div>
                </nav>
                <main style={{
                    zIndex: 7,
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                        {widok === 'Home' && <Home setWidok={setWidok} />}
                        {widok === 'Offer' && <Offer />}
                    {widok ==='Customers' && <Customers/>}
                        {widok === 'Employees' && <Employees/>}
                        {widok === 'Classes' && (
                            <Classes  showNotification={showNotification}
                                currentUser={currentUser}
                            />
                        )}
                        {widok === 'Login' && (
                            <Login
                                showNotification={showNotification}
                                setUserName={setUserName}
                                setCurrentUser={setCurrentUser}
                                setWidok={setWidok}
                            />
                        )}
                    {widok === 'Shopping Cart' && (
                        <ShoppingCart/>
                    )

                    }
            </main>
            {notification.show && (
                <div style={{
                    ...uniwersalStyles.notificationBox,
                    backgroundColor: notification.type === 'success' ? '#2ecc71' : '#e74c3c'
                }}>
                    <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
                    {notification.message}
                </div>
            )}
        </div>
    );}
export default App;