import {React,useState} from 'react'

function QuadSlice({quadObj,setCurrentDisplay}) {
    
  return (
    <div className="thisQuad" onClick={()=>{
        setCurrentDisplay(quadObj.info)
    }}>
        <img src={quadObj.img} alt="" className="qImg" />
        <div className="qContent">{quadObj.title}</div>
    </div>
  )
}

export default QuadSlice