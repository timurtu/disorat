/**
 * Created by timur on 1/16/17.
 */

import React from 'react'

const Panel = ({
  type,
  title,
  votes,
  totalVotes,
  onVoteClick,
  children,
}) => {

  const percent = Math.floor(votes / totalVotes * 100)
  const voteAmountText = votes > 1 ? 'votes' : 'vote'

  return (
    <div className={`panel panel-${type}`}>

      <div className="panel-heading">
        <div className="panel-title">
          {title}
        </div>
      </div>

      <div className="panel-body">

        <button
          className={`btn btn-block btn-${type}`}
          onClick={onVoteClick}
        >
          Vote for {title}
        </button>

        <h2 className="pull-right">{votes} {voteAmountText}</h2>
        <h2>{percent} %</h2>

        {children}
      </div>
    </div>
  )
}

export default Panel
