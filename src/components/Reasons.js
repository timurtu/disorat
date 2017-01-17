/**
 * Created by timur on 1/16/17.
 */

import React from 'react'

const Reasons = ({
  reasons,
  onAddReason
}) => {

  let input

  return (
    <div>
      <h4>Reasons</h4>

      <div className="list-group">
        {reasons.map((reason, i) =>
          <a
            key={i}
            href="#"
            className="list-group-item"
            onClick={e => {
              e.preventDefault()
              onAddReason(reason.title)
            }}
          >
            <span className="badge">{reason.count}</span>
            {reason.title}
          </a>
        )}

        <form onSubmit={e => {
          e.preventDefault()
          onAddReason(input.value.trim())
          input.value = ''
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
      </div>
    </div>
  )
}

export default Reasons
