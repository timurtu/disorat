/**
 * Created by timur on 1/17/17.
 */

import React from 'react'

const percent = (portion, total) => portion / total * 100

const Bar = ({
  type,
  width
}) => (
  <div
    className={`progress-bar progress-bar-${type}`}
    role="progressbar"
    aria-valuenow={width}
    aria-valuemin="0"
    aria-valuemax="100"
    style={{
      width: `${width}%`,
      verticalAlign: 'middle',
      lineHeight: '24px'
    }}
  >
    {Math.floor(width)}%
  </div>
)

const ProgressBar = ({
  portion1,
  portion2
}) => {
  const totalVotes = portion1 + portion2

  return (
    <div
      className="progress"
      style={{
        height: '24px'
      }}
    >
      <Bar
        type="info"
        width={percent(portion1, totalVotes)}
      />

      <Bar
        type="warning"
        width={percent(portion2, totalVotes)}
      />
    </div>
  )
}

export default ProgressBar
