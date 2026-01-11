import React from "react";

export const drawCalendar = (x) => {
    const year = 2026;
    const calendar = [];
    const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    let firstDay = new Date(year, x, 1).getDay();
    firstDay = (firstDay === 0) ? 6 : firstDay - 1;

    const daysInPrevMonth = new Date(year, x, 0).getDate();
    const daysInCurrentMonth = new Date(year, x + 1, 0).getDate();

    for ( let i =0;i<7;i++)
    {
        calendar.push(<div key={`h-${i}`} style={uniwersalStyles.dayHeader}>{dayNames[i]}</div>)
    }

    // 2. Poprzedni miesiąc (Gray Cells)
    for (let i = 0; i < firstDay; i++) {
        const d = daysInPrevMonth - firstDay + i + 1;
        const m = x === 0 ? 11 : x - 1; // Grudzień to 11
        const y = x === 0 ? year - 1 : year;
        calendar.push(
            <div key={`prev-${y}-${m}-${d}`} style={uniwersalStyles.grayDayCell}>{d}</div>
        );
    }

    // 3. Bieżący miesiąc (White Cells)
    for (let d = 1; d <= daysInCurrentMonth; d++) {
        calendar.push(
            <div key={`curr-${year}-${x}-${d}`} style={uniwersalStyles.dayCell}>{d}</div>
        );
    }

    // 4. Następny miesiąc (Gray Cells)
    let nextD = 1;
    while (calendar.length % 7 !== 0) {
        const m = x === 11 ? 0 : x + 1;
        const y = x === 11 ? year + 1 : year;
        calendar.push(
            <div key={`next-${y}-${m}-${nextD}`} style={uniwersalStyles.grayDayCell}>{nextD}</div>
        );
        nextD++;
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
            border:'2px solid black',
            display:'flex',
            justifyContent:'space-between',
            height:'15%',
            width:'100%',


        },
        gridContainer:{
            // flexGrow: 1,
            backgroundColor: '#ccc',
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gridAutoRows :'minmax(120px,auto)',
            gridTemplateRows: '10% repeat(5,1fr)',
            width:'99%',
            height:'auto',
            gap:'2px',
            border: '1px solid red',
            marginTop:'8%',
            padding:'1% 0.5%'

        },
        dayHeader:{
            //border:'3px solid black',
            justifyContent:'center',
            textAlign: 'flex-start',
            height:'80%',
            display:'flex',
            fontWeight:'700',
            fontSize :'1.5vw',
            lineHeight:'1',

        },
        dayCell:{
           // border:' 2px solid red',
            display :'flex',
            justifyContent:'center',
            textAlign: 'center',
            height:'80px',
            fontWeight:'500',
        },
        grayDayCell:{
            //border:' 2px solid red',
            display :'flex',
            justifyContent:'center',
            textAlign: 'center',
            height:'80px',
            color:'grey',
        }
}
export default uniwersalStyles;
