import React from 'react';
export const drawCalendar = (m,y,classesLookup,setPopup) => {
    const handleClick =(Class,z)=>{
        const rect = Class.target.getBoundingClientRect();
        let newx = rect.right+10;
        setPopup({
            visible:true,
            x:newx,
            y:rect.top,
            item : z
        })
    }
    const year = y;
    const month = m;
    const calendar = [];
    const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = (firstDay === 0) ? 6 : firstDay - 1;
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    for ( let i =0;i<7;i++)
    {
        calendar.push(<div key={`h-${i}`} style={uniwersalStyles.dayHeader}>{dayNames[i]}</div>)
    }
    for (let i = 0; i < firstDay; i++) {
        const d = daysInPrevMonth - firstDay + i + 1;
        const m = month === 0 ? 11 : month - 1;
        const y = month === 0 ? year - 1 : year;
        const kluczzajec = `${y}-${m}-${d}`;
        const zajeciategodnia = classesLookup[kluczzajec] || [];
        calendar.push(
            <div key={`${y}-${m}-${d}`} style={uniwersalStyles.grayDayCell}>
                {d}
                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                style ={classStyles[z.ClassID]}>
                                <header>{z.ClassName} </header>
                                <header style ={{alignSelf:'flex-end'}}>{z.time}</header>
                            </button>

                        ))
                    }
                </div>
            </div>
        );
    }
    for (let d = 1; d <= daysInCurrentMonth; d++) {
        const kluczzajec = `${y}-${m}-${d}`;
        const zajeciategodnia = classesLookup[kluczzajec] || [];
        calendar.push(
            <div key={`${year}-${month}-${d}`} style={uniwersalStyles.dayCell}>{d}

                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                style ={classStyles[z.ClassID]}>
                                <header>{z.ClassName} </header>
                                <header style ={{alignSelf:'flex-end'}}>{z.time}</header>
                            </button>

                        ))
                    }
                </div>
            </div>
        );
    }
    let nextD = 1;
    while (calendar.length % 7 !== 0) {
        const m = month === 11 ? 0 : month + 1;
        const y = month === 11 ? year + 1 : year;
        const kluczzajec = `${y}-${m}-${nextD}`;
        const zajeciategodnia = classesLookup[kluczzajec] || [];
        calendar.push(
            <div key={`${y}-${m}-${nextD}`} style={uniwersalStyles.grayDayCell}>{nextD}
                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                style ={classStyles[z.ClassID]}>
                                <header>{z.ClassName} </header>
                                <header style ={{alignSelf:'flex-end'}}>{z.time}</header>

                            </button>
                        ))
                    }
                </div>
            </div>
        );
        nextD = nextD+1;
    }
    return calendar;
};
export const uniwersalStyles ={
        desktopContainer:{position : 'relative',display: 'flex', justifyContent: 'center',alignItems: 'center',
            width:'100%',minHeight :'100vh',backgroundColor : 'black',overflow: 'hidden',margin: 0,padding: 0,zIndex :0},
        desktopWrapper: {position: 'relative', width: '100%', maxWidth: '1920px', height: 'auto', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,},
        desktopBackground :{position: 'relative',fontFamily:'Arial',left :'0%',top :'0%',zIndex: 2},
        menuContainer:{
            boxSizing: 'border-box',
            display: 'flex',padding: '0.7% 2%' ,backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent:'space-between',
            direction :'column',
            position:'absolute',left : '0%',top: '0%',width: '100%',height :'8%',zIndex : 4},
        menuButton :{
            width:'auto',
            backgroundColor: 'transparent',
            backdropFilter: 'no blur',
            color :'white',
            fontWeight :'100',
            fontFamily :'"Anonymous Pro", monospace',
            fontSize :'4vw',
            background :'transparent',
            border :"transparent",
            cursor :'pointer',
        },
        activeButton:{
            width:'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Bardzo ciemny, ale 80% przezroczystości
            backdropFilter: 'blur(5px)', // Rozmycie tła pod przyciskiem (efekt mrożonego szkła)
            //border: '2px solid white',
            color :'white',
            fontWeight :'700',
            fontFamily :'"Anonymous Pro", monospace',
            fontSize :'4.2vw',
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
            maring: '0px',
            // flexGrow: 1,
            backgroundColor: '#ccc',
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gridAutoRows :'minmax(40px,auto)',
            //gridTemplateRows: '10% repeat(5,1fr)',
            width:'99%',
            height:'auto',
            gap:'2px',
            //border: '1px solid red',
            padding:'1% 0.5%'

        },
        dayHeader:{
            //border:'3px solid black',
            justifyContent:'center',
            textAlign: 'flex-start',
            //height:'30px',
            display:'flex',
            fontWeight:'700',
            fontSize :'1.5vw',
            //lineHeight:'1',
        },
        dayCell:{
            border: '1px solid #e2e8f0',
            transition: 'background-color 0.2s',
           // border:' 2px solid red',
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
            height:'auto',
            width:'90%',
            gap:'2px'
        },

}
export const classStyles = {
        1: {
            boxSizing:'content-box',

            // CrossFit (Fiolet)
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #7B1FA2', backgroundColor: '#F3E5F5', color: '#7B1FA2'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',
        },
        2: {
            // HealthySpine (Pomarańcz)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #F57C00', backgroundColor: '#FFF3E0', color: '#F57C00'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',
        },
        3: {
            // Boks (Czerwony)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #D32F2F', backgroundColor: '#FFE5E5', color: '#D32F2F'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',
        },
        4: {
            // Joga (Błękit)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #1976D2', backgroundColor: '#E3F2FD', color: '#1976D2'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',
        },
        5: {
            // Zumba (Zieleń)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #388E3C', backgroundColor: '#E8F5E9', color: '#388E3C'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',

        },
        6: {
            // Basen (Morski)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #00796B', backgroundColor: '#E0F2F1', color: '#00796B'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',
        },
        7: {
            // Cardio (Różowy)
            boxSizing:'content-box',
            display :'flex',
            justifyContent:'center',
            marginTop: '10px', fontSize: '0.8vw', flexWrap: 'wrap', minHeight: '40px',
            border: '2px solid #C2185B', backgroundColor: '#FCE4EC', color: '#C2185B'
            ,textWrap:'wrap',paddingLeft:'2px',paddingRight:'2px',
            width:'45px',
            cursor:'pointer',

        }
    }
export default uniwersalStyles;
