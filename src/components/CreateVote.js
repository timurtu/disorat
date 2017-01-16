/**
 * Created by timur on 1/16/17.
 */

import React from 'react'

const InputBox = ({
  label,
  placeholder,
  type,
  onInputChange
}) => {

  const labelWithType = type ?
    <label className={`text-${type}`}>{label}</label> :
    <label>{label}</label>

  let input

  return (
    <div style={{
      margin: '0 0 1em'
    }}>
      {labelWithType}
      <input
        ref={node => {
          input = node
        }}
        onChange={() => {
          onInputChange(input.value)
        }}
        type="text"
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  )
}

const CreateVote = (props, { store }) => {

  let title, option1, option2

  return (
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

            store.dispatch({
              type: 'ADD_VOTE',
              title,
              option1,
              option2
            })

            console.log(store.getState())

          } else {
            alert('All fields are required to create a new vote.')
          }
        }}
      >

        <InputBox
          label="Title"
          placeholder="What are we voting on?"
          onInputChange={t => {
            title = t
          }}
        />

        <InputBox
          label="Option 1"
          placeholder="First Option"
          type="info"
          onInputChange={o1 => {
            option1 = o1
          }}
        />

        <InputBox
          label="Option 2"
          placeholder="Second Option"
          type="warning"
          onInputChange={o2 => {
            option2 = o2
          }}
        />

        <button className="btn btn-block btn-primary">
          Create Vote
        </button>
      </form>
    </div>
  )
}
CreateVote.contextTypes = {
  store: React.PropTypes.object
}

export default CreateVote
