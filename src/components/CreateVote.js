/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import { v4 } from 'node-uuid'
import InputBox from './InputBox'
import notify from '../notify'

const CreateVote = (props, { store }) => {

  let title, option1, option2

  return (
    <div>
      <Helmet title="Create a New Vote"/>

      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            Create a New Vote
          </div>
        </div>

        <form
          className="panel-body"
          onSubmit={e => {
            e.preventDefault()

            if (title && option1 && option2) {

              const id = v4().toString()

              store.dispatch({
                type: 'CREATE_VOTE',
                id,
                title,
                option1,
                option2,
              })

              notify('Vote Created Successfully!')
              browserHistory.push(`/votes/${id}`)

            } else {
              notify('All fields are required to create a new vote.')
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
