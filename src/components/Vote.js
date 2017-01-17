/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import Helmet from 'react-helmet'
import InputBox from './InputBox'
import notify from '../notify'
import Panel from './Panel'
import Reasons from './Reasons'
import {FacebookShareButton, TwitterShareButton} from './ShareButtons'

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
      <Helmet
        title={`${vote.title} | ${vote.option1} or ${vote.option2}`}
      />

      <h2>{vote.title}</h2>

      <InputBox
        label="Share"
        onClick={e => {
          e.target.select()
          document.execCommand('copy')
          notify(`Vote copied to clipboard!`)
        }}
      >
        {location.href}
      </InputBox>

      <div style={{
        display: 'table',
        margin: '0 auto'
      }}>
        <FacebookShareButton url={location.href}/>

        <TwitterShareButton url={location.href}/>
      </div>

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
          >
            <Reasons
              reasons={vote.reasons1}

              onAddReason={title => {

                const reason = {
                  title
                }

                store.dispatch({
                  type: 'ADD_REASON1',
                  id: vote.id,
                  reason
                })

              }}
            />
          </Panel>
        </div>

        <div className="col-sm-6">
          <Panel
            type="warning"
            title={vote.option2}
            votes={vote.option2votes}
            totalVotes={totalVotes}
          >
            <Reasons
              reasons={vote.reasons2}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
Vote.contextTypes = {
  store: React.PropTypes.object
}

export default Vote
