import  React, { useState , useEffect } from "react";
import '../styles/TopBar.css';

export const DateTime = () => {

    var [date , setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div className="body">
            <div className="time">
                <p><b>Today's Date : {date.toLocaleDateString()}</b></p>
                <p><b>Current Time : {date.toLocaleTimeString()}</b></p>
            </div> 
            </div>  
    );
}

export default DateTime;