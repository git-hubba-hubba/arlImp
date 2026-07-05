import React from 'react'

function JoinComp({ onSignUp, onLogin }) {
  return (
    <>
    <img src="../../public/impactteam.png" alt="" className="mpactTeam" />
      <div className="joinNowContainer">
          <h1 className="joinMax fontdiner-swanky-regular">Join Our Community</h1>
          <p style={{padding:"1em"}}>
            Register / Join, Create your profile, Play your Role and start
            making your life and the world a better place.
        </p>
        
        <div className="btnContainer">
          <button className="signUp" type="button" onClick={onSignUp}>Sign Up</button>
          <button className="signUp" type="button" onClick={onLogin}>Log In</button>
        </div>
      </div>
    
    
    </>
  )
}

export default JoinComp
