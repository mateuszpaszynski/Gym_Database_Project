import React,{useState}  from 'react'
import {ROLES} from './App.jsx'
import {uniwersalStyles} from "./styles"
function Login({showNotification,setUserName,setCurrentUser,setWidok})
{
    const [formData,setFormData] = useState({Login:"",user_secret_code:""});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async()=>{
        try {
            if ( localStorage.getItem('gymUser') !==null)
            {
                showNotification("You are already logged in",'error');
                return;
            }
            const response = await fetch('http://localhost:5000/api/Auth',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({Login: formData.Login,Password: formData.user_secret_code})
            })
            if ( response.ok) {
                const data = await response.json();
                localStorage.setItem('gymUser',JSON.stringify(data));
                setCurrentUser(data);
                setWidok('Home');
                showNotification("Hello " + data.userName);
                setUserName(data.userName);
            }
            else {
                switch(response.status)
                {
                    case 404: {
                        showNotification("User not found",'error');
                        break;
                    }
                    case 401: {
                        showNotification("Wrong password",'error');
                        break;
                    }
                    default: {
                        showNotification("Server error",'error');
                        break;
                    }
                }
                console.log(response);
            }
        }
        catch(err) {
            console.log("Blad sieci",err);
        }
    }
        const handleLogOut = () => {
            if ( localStorage.getItem('gymUser') === null)
            {
                return;
            }
            localStorage.removeItem('gymUser'); // Czyścimy pamięć stałą
            setCurrentUser(null);
            setWidok('Home');
            showNotification("Logged out");
            setUserName('Log in');
        };
    return (
        <div style ={styles.glassCard}>
            <header style = {styles.header}>LOG IN </header>
            <div style ={{padding:'5px'}}>
                <header style = {styles.title}>Login</header>
                <input type="varchar" name="Login" value={formData.Login} onChange={handleChange} alt = "Login" style = {styles.input}/>
            </div>
            <div style ={{padding:'5px'}}>
                <header style = {styles.title}>Password</header>
                <input type="password" name="user_secret_code" autoComplete="new-password" value={formData.user_secret_code} onChange={handleChange} alt = "user_secret_code" style = {styles.input}/>
            </div>
            <button type="submit" onClick={()=>handleSubmit()} style ={{width:'97.5%',alignSelf:'center'}}>SUBMIT</button>
            <button onClick={()=>handleLogOut()} style = {{width:'97.5%',alignSelf:'center'}}>LOG OUT</button>
        </div>
    );
}
const styles = {
    glassCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight:'100px',
        minWidth:'100px',
        maxWidth: '1200px',
        width: '100%',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        color: 'white',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignSelf:'center',
        justifySelf:'center',
    },
    input:{
        fontSize :'2rem',
    },
    title:{
        fontSize:'2rem',
    },
    header:{
        fontSize:'3rem',
        alignSelf:'center',
        justifySelf:'flex-start',
        paddingBottom:'50px'
    }
}
export default Login;
