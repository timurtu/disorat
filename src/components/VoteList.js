/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { Link } from 'react-router'
import { breakWord } from '../globals'
import ProgressBar from './ProgressBar'

const Votes = (props, {
  store
}) => {

  const state = store.getState()

  return (
    <div>
      {state.map((vote, i) =>
        <div
          key={i}
          className="panel panel-primary"
        >
          <div
            style={breakWord}
            className="panel-heading"
          >
            <Link
              style={{
                color: '#fff'
              }}
              to={`/votes/${vote.id}`}
            >
              <div className="panel-title">
                {vote.title}
              </div>
            </Link>
          </div>

          <div className="panel-body">

            <ProgressBar
              portion1={vote.option1votes}
              portion2={vote.option2votes}
            />

            <div className="btn-group btn-group-justified" role="group">
              <div className="btn-group" role="group">
                <button
                  style={breakWord}
                  className="btn btn-info"
                  onClick={() => {

                    store.dispatch({
                      type: 'VOTE1',
                      id: vote.id
                    })
                  }}
                >
                  {vote.option1}
                </button>
              </div>

              <div className="btn-group" role="group">
                <button
                  style={breakWord}
                  className="btn btn-warning"
                  onClick={() => {

                    store.dispatch({
                      type: 'VOTE2',
                      id: vote.id
                    })
                  }}
                >
                  {vote.option2}
                </button>
              </div>
            </div>
          </div>

          <Link
            style={{
              color: '#000'
            }}
            to={`/votes/${vote.id}`}
          >
            <div className="panel-footer">
              {vote.option1votes + vote.option2votes} votes
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

Votes.contextTypes = {
  store: React.PropTypes.object
}

export default Votes
