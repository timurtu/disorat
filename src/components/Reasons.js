/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { breakWord } from '../globals'

const Reasons = ({
  reasons,
  onAddReason
}) => {

  let input

  return (
    <div>
      <h3>Reasons</h3>

      <div
        style={breakWord}
        className="list-group"
      >
        {reasons
          .sort((x, y) => y.count - x.count)
          .map((reason, i) =>
            <a
              key={i}
              href="#"
              className="list-group-item"
              onClick={e => {
                e.preventDefault()
                onAddReason(reason.reason)
              }}
            >
              <span className="badge">{reason.count}</span>
              {reason.reason}
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
