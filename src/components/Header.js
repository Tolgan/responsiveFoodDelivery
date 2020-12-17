import React from "react"

function Header(){ 
const hours=new Date().getHours()
let timeofday ; if (hours<12){timeofday="Morning"}  else if
 (hours>=12 && hours<17){timeofday="Evening"}
else{timeofday="Night"}      
    
    return(<header className="navbar">Good {timeofday}       </header>      )   }

export default Header