import React, {useState} from "react";
import uniwersalStyles, {classStyles} from "./styles";
export const drawCalendar = (m,y,classesLookup,setPopup,fetchTrainers,setClassForm,userID) => {
    const handleAddClass = (z)=> {
        fetchTrainers(z);
       setClassForm({visible:true,item:z})
    }
    const handleClick =(Class,z)=>{
        const rect = Class.target.getBoundingClientRect();
        let newx = rect.right+10;
        let newy = rect.top + 150 < window.innerHeight ? rect.top - 40 : rect.top - 100;
        setPopup({
            visible:true,
            x:newx,
            y:newy,
            item : z
        })
        fetchTrainers(z.StartTime);
    }
    const today = new Date();
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
        const isToday = (today.getFullYear() === y && today.getMonth() === m && today.getDate() === d) ? 1 : 0;
        calendar.push(
            <div key={`${y}-${m}-${d}`} style={isToday? {...uniwersalStyles.grayDayCell,border:'2px solid red'} : uniwersalStyles.grayDayCell}
          >
                {d}
                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                    style ={classStyles[z.ClassID]}>
                                <div>{z.ClassName === 'Full Body Workout' ? 'FB Workout' : z.ClassName} </div>
                                <div style ={{alignSelf:'flex-end'}}>{z.time}</div>
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
        const isToday = (today.getFullYear() === y && today.getMonth() === m && today.getDate() === d) ? 1 : 0;
        const monthString = String(month+1).padStart(2,'0');
        const dayString = String(d).padStart(2,'0');
        calendar.push(
            <div key={`${year}-${month}-${d}`} style={isToday? {...uniwersalStyles.dayCell,border:'2px solid red'} : uniwersalStyles.dayCell}
                 >{d}
                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                    style ={classStyles[z.ClassID]}>
                                <div>{z.ClassName === 'Full Body Workout' ? 'FB Workout' : z.ClassName} </div>
                                <div style ={{alignSelf:'flex-end'}}>{z.time}</div>
                            </button>
                        ))}
                    {userID===1 && (today.getFullYear() < y || ( today.getFullYear() === y && today.getMonth() < m) ||(today.getMonth() === m && today.getDate() <= d)) ? (<button style={{alignSelf:'center',cursor:'pointer'}} onClick={(e)=>handleAddClass(`${year}-${monthString}-${dayString}`)}>+</button>) : null}
                </div>
            </div>
        );
    }
    let nextD = 1;
    while (calendar.length < 49) {
        const m = month === 11 ? 0 : month + 1;
        const y = month === 11 ? year + 1 : year;
        const kluczzajec = `${y}-${m}-${nextD}`;
        const zajeciategodnia = classesLookup[kluczzajec] || [];
        const isToday = (today.getFullYear() === y && today.getMonth() === m && today.getDate() === nextD) ? 1 : 0;
        calendar.push(
            <div key={`${y}-${m}-${nextD}`} style={isToday? {...uniwersalStyles.grayDayCell,border:'2px solid red'} : uniwersalStyles.grayDayCell}
            >{nextD}
                <div style = {uniwersalStyles.containerClassBoxes}>
                    {
                        zajeciategodnia.map(z => (
                            <button onClick={(e)=> handleClick(e,z)}
                                    style ={classStyles[z.ClassID]}>
                                <div>{z.ClassName === 'Full Body Workout' ? 'FB Workout' : z.ClassName}</div>
                                <div style ={{alignSelf:'flex-end'}}>{z.time}</div>
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
export default drawCalendar;