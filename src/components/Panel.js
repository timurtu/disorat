/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { breakWord } from '../globals'

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
    <div
      className={`panel panel-${type}`}
      style={{
        marginTop: '.75em'
      }}
    >
      <div className="panel-heading">
        <div className="panel-title">
          {title}
          <span className="pull-right">
            <span className="badge">
              {votes} {voteAmountText}
            </span>
            {' '}
            <span className="badge">
              {percent} %
            </span>
          </span>
        </div>
      </div>

      <div className="panel-body">
        <button
          className={`btn btn-block btn-${type}`}
          onClick={onVoteClick}
          style={{
            ...breakWord,
            marginBottom: '1em'
          }}
        >
          Vote for {title}
        </button>

        {children}
      </div>
    </div>
  )
}

export default Panel
