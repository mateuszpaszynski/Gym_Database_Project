import React from 'react';
import mainbackground from "./background.jpg";
export const uniwersalStyles ={
    desktopContainer:{
        display: 'flex',
        gap:'20px',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        backgroundImage: `url(${mainbackground})`,
        width:'100%',minHeight :'100vh',
        height:'auto',
        overflow: 'hidden',margin: 0,padding: 0,zIndex :2,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    menuContainer:{
        justifySelf :'flex-start',
        alignSelf:'flex-start',
        boxSizing: 'border-box',
        display: 'flex',padding: '0.7% 2%' ,backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent:'space-between',
        direction :'column',
        width: '100%',height :'auto',zIndex : 2},
    menuButton :{
        width:'auto',
        backgroundColor: 'transparent',
        backdropFilter: 'no blur',
        color :'white',
        fontWeight :'100',
        fontFamily :'"Anonymous Pro", monospace',
        fontSize :'3vw',
        background :'transparent',
        border :"transparent",
        cursor :'pointer',
    },
    activeButton:{
        width:'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
        color :'white',
        fontWeight :'700',
        fontFamily :'"Anonymous Pro", monospace',
        fontSize :'3vw',
        background :'transparent',
        cursor :'pointer',
    },
    calendarMenu:{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        margin: '0px',
        fontSize :'3vw',
        fontWeight:'700',
        //border:'2px solid black',
        display:'flex',
        justifyContent:'flex-end',
        alignItems: 'center',
        width:'100%',
    },
    gridContainer:{
        margin: '0px',
        overflowY: 'auto',
        backgroundColor: '#ccc',
        display: 'grid',
        gridTemplateColumns: 'repeat(7,1fr)',
        gridAutoRows :'minmax(40px,auto)',
        width:'100%',
        gap:'2px',
        marginBottom:'80px',
    },
    dayHeader:{
        margin:'3px',
        //border:'3px solid black',
        justifyContent:'center',
        textAlign: 'flex-start',
        display:'flex',
        fontWeight:'700',
        fontSize :'1.5vw',
    },
    dayCell:{
        border: '1px solid #e2e8f0',
        transition: 'background-color 0.2s',
        display :'flex',
        flexDirection:'column',
        justifyContent:'center',
        textAlign: 'center',
        height:'90px',
        fontWeight:'500',
    },
    grayDayCell:{
        border: '1px solid #e2e8f0',
        transition: 'background-color 0.2s',
        //border:' 2px solid red',
        display :'flex',
        flexDirection:'column',
        justifyContent:'center',
        textAlign: 'center',
        height:'90px',
        color:'grey',

    },
    containerClassBoxes:{
        alignSelf:'center',
        display:'flex',
        justifyContent:'space-around',
        width:'90%',
        gap:'2px',
        maxHeight:'60%',
    },
    notificationBox: {
        position:'fixed',
        zIndex: 9999,
        alignSelf:'center',
        justifySelf:'center',

        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // Cień dla efektu 3D
        transition: 'all 0.3s ease', // Ładne pojawianie się
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },

}
export const classStyles = {
    1: {
        boxSizing:'content-box',
       //Aerobics
        display :'flex',
        justifyContent:'center',
        fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #7B1FA2', backgroundColor: '#F3E5F5', color: '#7B1FA2'
        ,textWrap:'wrap',
        width:'47px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    2: {
        //Fitness
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
        fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #F57C00', backgroundColor: '#FFF3E0', color: '#F57C00'
        ,textWrap:'wrap',
        width:'45px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    3: {
        //Welness 50+
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
        fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #D32F2F', backgroundColor: '#FFE5E5', color: '#D32F2F'
        ,textWrap:'wrap',
        width:'50px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    4: {
        //Crossfit
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
        fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #1976D2', backgroundColor: '#E3F2FD', color: '#1976D2'
        ,textWrap:'wrap',
        width:'45px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    5: {
        //Healthy Spine
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
        fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #388E3C', backgroundColor: '#E8F5E9', color: '#388E3C'
        ,textWrap:'wrap',
        width:'45px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    6: {
        //FullBody Workout
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
         fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #00796B', backgroundColor: '#E0F2F1', color: '#00796B'
        ,textWrap:'wrap',
        width:'53px',
        cursor:'pointer',
        overflow :'hidden',
        borderRadius: '3px',
    },
    7: {
        //Zumba
        boxSizing:'content-box',
        display :'flex',
        justifyContent:'center',
         fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
        border: '2px solid #C2185B', backgroundColor: '#FCE4EC', color: '#C2185B'
        ,textWrap:'wrap',
        width:'45px',
        cursor:'pointer',
        borderRadius: '3px',

    }
}
export default uniwersalStyles;