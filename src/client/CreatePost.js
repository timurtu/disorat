/**
 * Created by timur on 11/12/16.
 */

import React from 'react'

$(function() {
  $('.dropdown').dropdown()
})

const CreatePost = () =>
  <div className="ui segment">
    <form className="ui form">
      <div className="field">
        <label>Title</label>
        <input type="text" placeholder="Short Explanation"/>
      </div>
      <div className="two fields">
        <div className="required field">
          <label>Option 1</label>
          <input type="text" placeholder="First Option"/>
        </div>
        <div className="required field">
          <label>Option 2</label>
          <input type="text" placeholder="Second Option"/>
        </div>
      </div>
      <div className="required field">
        <label>How long will voting last until a winner is declared?</label>
        <div className="ui selection dropdown">
          <div className="default text">Select</div>
          <i className="dropdown icon"></i>
          <input type="hidden" name="gender"/>
            <div className="menu">
              <div className="item" value="forever">Forever</div>
              <div className="item" value="month">1 Month</div>
              <div className="item" value="week">1 Week</div>
              <div className="item" value="day">1 Day</div>
            </div>
        </div>
      </div>
      {/*<div className="inline fields">*/}
        {/*<label>How long will voting last until a winner is declared?</label>*/}
        {/*<div className="field">*/}
          {/*<div className="ui radio checkbox">*/}
            {/*<input type="radio" name="length" tabIndex="0" className="hidden"/>*/}
            {/*<label>Forever</label>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<div className="ui radio checkbox">*/}
            {/*<input type="radio" name="length" tabIndex="0" className="hidden"/>*/}
            {/*<label>1 month</label>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<div className="ui radio checkbox">*/}
            {/*<input type="radio" name="length" tabIndex="0" className="hidden"/>*/}
            {/*<label>1 week</label>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="field">*/}
          {/*<div className="ui radio checkbox">*/}
            {/*<input type="radio" name="length" tabIndex="0" className="hidden"/>*/}
            {/*<label>1 day</label>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}
      <div className="ui submit button">Create</div>
    </form>
  </div>

export default CreatePost
