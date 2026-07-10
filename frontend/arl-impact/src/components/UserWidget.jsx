import React from 'react'

function UserWidget({ points = 0 }) {
  const levelSize = 500;
  const safePoints = Number(points) || 0;
  const level = Math.floor(safePoints / levelSize) + 1;
  const pointsIntoLevel = safePoints % levelSize;
  const pointsToNextLevel = levelSize - pointsIntoLevel;
  const progressPercent = Math.min((pointsIntoLevel / levelSize) * 100, 100);

  return (
    <>
    <div className="profileWidget">
    <p className="proScore">Total Points: </p>
    <h1 className="pointCounter">{safePoints}</h1>
    <div
      className="trackbarMajor"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax={levelSize}
      aria-valuenow={pointsIntoLevel}
    >
        <div className="lilTracker" style={{ width: `${progressPercent}%` }}></div>
    </div>
    <p className="pointCnt2">Level {level} - {pointsToNextLevel} pts. to next level</p>
    </div>
    
    
    </>
  )
}

export default UserWidget
