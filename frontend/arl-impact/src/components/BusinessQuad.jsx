import {React,useState} from "react";
import QuadSlice from "./QuadSlice";

function BusinessQuad() {
const [currentDisplay, setCurrentDisplay] =useState("")
  let quadObjs = [
    {
      img: "https://plus.unsplash.com/premium_photo-1661775317533-2163ba4dbc93?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5vbiUyMHByb2ZpdHxlbnwwfHwwfHx8MA%3D%3D",
      info: "Keep up the good work our community will support your mission whenever possible.",
      title: "Non-Profit Founders",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1733266933604-555228417755?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjBvd25lcnN8ZW58MHx8MHx8fDA%3D",
      info: "Give-back a service or product with at least a $25 value to someone in our community (once a month).  Also provide a discount on services or product whenever possible.",
      title: "Business Owners",
    },
    {
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: "Donate to the Non-Profits in our community and join us in Giving.",
      title: "Corporations",
    },
    {
      img: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      info: "Enjoy what we do and live life different.  Win give-backs and learn new things. Work on improving your finances and health. And the list goes on. Support local Businesses and Non-Profits in our community. You’re invited to all seminars, outing and anything on our calendar of events. So come out, learn and have fun.  And most importantly Be KIND, say hello, and smile.  No hate, division or drama here.",
      title: "Members",
    },
  ];
  return (
    <>
      <div className="quadContainer">
        <div className="quadSep">
          <QuadSlice setCurrentDisplay={setCurrentDisplay} quadObj={quadObjs[0]} />
          <QuadSlice setCurrentDisplay={setCurrentDisplay} quadObj={quadObjs[1]} />
        </div>
        <div className="quadScreen">{currentDisplay}</div>
        <div className="quadSep">
          <QuadSlice setCurrentDisplay={setCurrentDisplay} quadObj={quadObjs[2]} />
          <QuadSlice setCurrentDisplay={setCurrentDisplay} quadObj={quadObjs[3]} />
        </div>
      </div>
    </>
  );
}

export default BusinessQuad;
