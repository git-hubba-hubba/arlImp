import React from "react";
import EventSlice from "./EventSlice";
import BizSlice from "./BizSlice";

function EventWidget() {
  let demoEvent = [
    {
    evtTitle: "Goodwill Job Fair",
    evtDateTime: "Sat at 9:30am",
  },{
    evtTitle: "Arlington NPU Meeting",
    evtDateTime: "Fri at 11:15am",
  },{
    evtTitle: "Black Chamber of Commerce Alliance Stand Up",
    evtDateTime: "Thurs at 2:30pm",
  }
]

  let demoBiz={
    bizName: "ABC Consulting Company",
    bizIcon: "https://cdn-icons-png.flaticon.com/512/7521/7521450.png"
  }
  return (
    <>
      <div className="ewContainer">
        <div className="eventLoadTitle">Upcoming Events</div>
        <EventSlice eventObj={demoEvent[0]} />
        <EventSlice eventObj={demoEvent[1]} />
        <EventSlice eventObj={demoEvent[2]} />

        <br />
        <p>Nearby Businesses</p>

        <BizSlice businessObj={demoBiz}/>
        <BizSlice businessObj={demoBiz}/>
        <BizSlice businessObj={demoBiz}/>

      </div>
    </>
  );
}

export default EventWidget;
