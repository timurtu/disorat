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
              <span className="badge">
                {reason.count}
              </span>

              {reason.reason}
            </a>
          )}
      </div>

      <form onSubmit={e => {
        e.preventDefault()

        if (input.value === '') {
          return
        }

        onAddReason(input.value.trim())
        input.value = ''
      }}>
        <button
          style={{
            margin: '1em 0'
          }}
          className="btn btn-primary btn-block"
        >
          Add Reason
        </button>

        <textarea
          ref={node => {
            input = node
          }}
          style={{
            maxWidth: '100%'
          }}
          placeholder="Add a New Reason"
          className="form-control"
        />
      </form>
    </div>
  )
}
Reasons.propTypes = {
  onAddReason: React.PropTypes.func.isRequired
}

export default Reasons
