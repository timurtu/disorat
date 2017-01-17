/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import Helmet from 'react-helmet'
import InputBox from './InputBox'
import notify from '../notify'

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

class TwitterShareButton extends React.Component {

  componentDidMount() {
    const script = document.createElement('script')
    script.src = '//platform.twitter.com/widgets.js'
    document.body.appendChild(script)
  }

  render() {
    return (
      <a
        href={this.props.url}
        className="twitter-share-button"
        data-size="large"
      >
        Tweet
      </a>
    )
  }
}

const FacebookShareButton = ({
  url
}) => (
  <iframe
    src={`https://www.facebook.com/plugins/share_button.php?href=
          ${encodeURIComponent(url)}
          &layout=button&size=large&mobile_iframe=true&appId=176185646121120&width=73&height=28`}
    width="73"
    height="28"
    style={{
      border: 'none',
      overflow: 'hidden'
    }}
    scrolling="no"
    frameBorder="0"
    allowTransparency="true"/>
)

const Reasons = ({
  reasons,
  onAddReason
}) => {

  let input

  return (
    <div>
      <h3>Reasons</h3>
      <ul className="list-group">
        {reasons.map((reason, i) =>
          <li
            key={i}
            className="list-group-item"
          >
            <span className="badge">{reason.count}</span>
            {reason.title}
          </li>
        )}

        <form onSubmit={e => {
          e.preventDefault()
          onAddReason(input.value.trim())
        }}>
          <textarea
            ref={node => {
              input = node
            }}
            style={{
              maxWidth: '100%',
              margin: '1em 0'
            }}
            placeholder="Add a New Reason"
            className="form-control"
          />

          <button className="btn btn-primary btn-block">
            Add Reason
          </button>
        </form>
      </ul>
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
