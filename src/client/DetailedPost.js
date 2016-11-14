/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'
import PieChart from 'react-simple-pie-chart'


const ProgressBar = () =>
<div style={{
  maxWidth: '50%',
  margin: '0 auto'
}}>
  <PieChart slices={
    [{
      color: '#00B5AD',
      value: 70,
    }, {
      color: '#F2711C',
      value: 30,
    }]
  }/>
</div>

class DetailedPost extends React.Component {

  componentWillMount() {
    this.setState({ message: '404: Page not found!' })
  }

  componentDidMount() {

    fetch(`/posts${location.pathname}`, { method: 'POST' })
      .then(res => res.json())
      .then(p => {
        const post = JSON.parse(p)
        this.setState({
          id: post.id,
          message: post.message
        })
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>

        <div className="ui horizontal segments">
          <div className="ui segment">
            <h3>T-Rex</h3>
            <h5>7 votes</h5>
            <h5>46%</h5>
            <button className="fluid ui button colored teal">
              T-rex
            </button>

            <div className="ui horizontal segments">
              <div className="ui segment">
                <h3>Pros</h3>
              </div>
              <div className="ui segment">
                <h3>Cons</h3>
              </div>
            </div>
          </div>

          <div className="ui segment">
            <h3>Abraham Lincoln</h3>
            <h5>8 votes</h5>
            <h5>54%</h5>
            <button className="fluid ui button colored orange">
              Abraham Lincoln
            </button>

            <div className="ui horizontal segments">
              <div className="ui segment">
                <h3>Pros</h3>
              </div>
              <div className="ui segment">
                <h3>Cons</h3>
              </div>
            </div>
          </div>
        </div>
        <ProgressBar/>
      </div>
    )
  }
}

export default DetailedPost
