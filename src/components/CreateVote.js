/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import { v4 } from 'node-uuid'

class InputBox extends React.Component {

  componentDidMount() {
    const { onMount } = this.props
    if (onMount) {
      onMount(this.input)
    }
  }

  render() {

    const {
      type,
      label,
      onInputChange,
      placeholder
    } = this.props

    const labelWithType = type ?
      <label className={`text-${type}`}>{label}</label> :
      <label>{label}</label>

    return (
      <div style={{
        margin: '0 0 1em'
      }}>
        {labelWithType}
        <input
          ref={node => {
            this.input = node
          }}
          onChange={() => {
            onInputChange(this.input)
          }}
          type="text"
          placeholder={placeholder}
          className="form-control"
        />
      </div>
    )
  }
}

const CreateVote = (props, { store }) => {

  let title, option1, option2

  return (
    <div>
      <Helmet title="Create a Vote"/>

      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            Create a new vote
          </div>
        </div>

        <form
          className="panel-body"
          onSubmit={e => {
            e.preventDefault()

            if (title && option1 && option2) {

              const id = v4()

              store.dispatch({
                type: 'CREATE_VOTE',
                id,
                title,
                option1,
                option2,
              })

              browserHistory.push(`/votes/${id}`)

            } else {
              alert('All fields are required to create a new vote.')
            }
          }}
        >
          <InputBox
            label="Title"
            placeholder="What are we voting on?"
            onInputChange={t => {
              title = t.value
            }}
            onMount={t => {
              t.focus()
            }}
          />

          <div className="row">
            <div className="col-sm-6">
              <InputBox
                label="Option 1"
                placeholder="First Option"
                type="info"
                onInputChange={o1 => {
                  option1 = o1.value
                }}
              />
            </div>

            <div className="col-sm-6">
              <InputBox
                label="Option 2"
                placeholder="Second Option"
                type="warning"
                onInputChange={o2 => {
                  option2 = o2.value
                }}
              />
            </div>
          </div>

          <button className="btn btn-block btn-primary">
            Create Vote
          </button>
        </form>
      </div>
    </div>
  )
}
CreateVote.contextTypes = {
  store: React.PropTypes.object
}

export default CreateVote
