import React from "react";
import uniwersalStyles, {classStyles} from "./styles";

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
    while (calendar.length < 49) {
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
export default drawCalendar;