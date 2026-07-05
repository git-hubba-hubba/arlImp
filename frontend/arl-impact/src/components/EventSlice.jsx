function EventSlice({ eventObj }) {
  return (
    <>
      <div className="sliceevt">
        <p className="topEvt">{eventObj.evtTitle}</p>
        <p className="btmEvt">{eventObj.evtDateTime}</p>
      </div>
    </>
  );
}

export default EventSlice;
