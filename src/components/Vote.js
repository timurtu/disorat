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

  const percent = votes / totalVotes * 100
  const voteAmountText = votes > 1 ? 'votes' : 'vote'

  return (
    <div className={`panel panel-${type}`}>

      <div className="panel-heading">
        <div className="panel-title">
          {title}
        </div>
      </div>

      <div className="panel-body">

        <h2 className="pull-right">{votes} {voteAmountText}</h2>
        <h2>{percent} %</h2>

        <button
          className={`btn btn-block btn-${type}`}
          onClick={onVoteClick}
        >
          Vote for {title}
        </button>

        {children}
      </div>
    </div>
  )
}

const Vote = ({
  params
}, {
  store
}) => {
  const state = store.getState()
  const vote = state.find(v => v.id === params.id)
  const totalVotes = vote.option1votes + vote.option2votes

  return (
    <div>
      <h2>{vote.title}</h2>

      <div className="row">
        <div className="col-sm-6">
          <Panel
            type="info"
            title={vote.option1}
            votes={vote.option1votes}
            totalVotes={totalVotes}
            onVoteClick={() => {

              store.dispatch({
                type: 'VOTE_1',
                id: vote.id
              })

            }}
          />
        </div>

        <div className="col-sm-6">
          <Panel
            type="warning"
            title={vote.option2}
            votes={vote.option2votes}
            totalVotes={totalVotes}
          />
        </div>
      </div>
    </div>
  )
}
Vote.contextTypes = {
  store: React.PropTypes.object
}

export default Vote
