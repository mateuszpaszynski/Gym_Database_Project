import React,{useState}  from 'react'
import {ROLES} from './App.jsx'
import {uniwersalStyles} from "./styles"
function Login({onNavigate})
{
    const handleClick = async()=>{

    }
    const [formData,setFormData]=useState();
    return (
        <div style ={styles.glassCard}>
            <header style = {styles.header}>LOG IN </header>
            <div style ={{padding:'5px'}}>
                <header style = {styles.title}>Login</header>
                <input alt = "Login" style = {styles.input}/>
            </div>
            <div style ={{padding:'5px'}}>
                <header style = {styles.title}>Password</header>
                <input alt = "Password" style = {styles.input}/>
            </div>
            <button onClick={()=>handleClick()} style ={{width:'97.5%',alignSelf:'center'}}>SUBMIT</button>
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
