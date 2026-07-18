function QuadSlice({ quadObj, setCurrentDisplay }) {
  return (
    <button
      className="thisQuad"
      type="button"
      onClick={() => {
        setCurrentDisplay(quadObj.info);
      }}
    >
      <img src={quadObj.img} alt="" className="qImg" />
      <span className="qContent">{quadObj.title}</span>
    </button>
  );
}

export default QuadSlice;
