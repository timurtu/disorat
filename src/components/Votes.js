/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { Link } from 'react-router'
import {breakWord} from '../globals'

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
            <div className="panel-title">
              <Link to={`/votes/${vote.id}`}>
                {vote.title}
              </Link>
            </div>
          </div>

          <div className="panel-body">

          </div>

          <div className="panel-footer">
            {vote.option1votes + vote.option2votes} votes
          </div>
        </div>
      )}
    </div>
  )
}

Votes.contextTypes = {
  store: React.PropTypes.object
}

export default Votes
