/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'
import Search from './Search'
const $ = window.$

function collapse() {
  $('.collapse').collapse('hide')
}

export default ({ title, links, id }) =>
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <span onClick={collapse}>
          <Link className="navbar-brand" to="/feed">
            <img style={{
              width: '1.125em'
            }} src="/res/pie-chart.png" alt="Disorat Brand Logo"/>
          </Link>

          <Link className="navbar-brand" to="/feed">{title}</Link>
        </span>

        <button className="navbar-toggle collapsed" data-target={`#${id}`} data-toggle="collapse" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </button>
      </div>

      <div className="collapse navbar-collapse" id={id}>
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <Search
              placeholder="Search..."
              onSubmit={collapse}
            />
          </div>
        </form>

        <ul className="nav navbar-nav navbar-right">
          {links.map((link, i) =>
            <li key={i}>
              <Link
                onClick={collapse}
                to={`/${link}`}
                style={{
                  textTransform: 'capitalize'
                }}>
                {link}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
