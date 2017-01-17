/**
 * Created by timur on 1/16/17.
 */

import React from 'react'

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
      placeholder,
      children,
      onClick
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
          value={children}
          onClick={onClick}
        />
      </div>
    )
  }
}

export default InputBox
