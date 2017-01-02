/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'
import { List, Map } from 'immutable'
import { apiUrl } from '../globals'

let cachedPosts

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = Map({
      results: List()
    }).toJS()
  }

  fetchPosts(e) {

    const query = e.target.value.toLowerCase()

    if (query === '') {
      this.setState(Map({
        results: List()
      }))
      return
    }

    if (cachedPosts) {

      const results = cachedPosts.filter(x => x.content.toLowerCase().startsWith(query))

      this.setState({ results })

    } else {

      fetch(`${apiUrl}/posts`, { method: 'POST' })
        .then(res => res.json())
        .then(posts => {

          cachedPosts = [].concat.apply([],
            [].concat.apply([],
              posts.map(({ id, title, option1, option2 }) => {
                return [
                  { id, title, content: title },
                  { id, title, content: option1 },
                  { id, title, content: option2 }
                ]
              })
            )
              .map(({ title, id, content }) => {
                const words = content.trim().split(/\s/)
                return words.map(content => {
                  return { title, id, content }
                })
              })
          )

          const data = cachedPosts.filter(x => x.content.toLowerCase().startsWith(query))

          this.setState({
            results: data
          })
        })

      if (!query) {
        this.setState({
          results: []
        })
      }
    }
  }

  render() {
    return (
      <span>
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.fetchPosts.bind(this)}/>

        {this.state.results.length > 0 ?
          <div className="well" style={{
            position: 'fixed',
            zIndex: 5,
            width: '100%',
            height: '100%',
            left: 0,
            overflow: 'scroll'
          }}>
            {this.state.results.map((top, i) =>
              <Link
                key={i}
                to={`/votes/${top.id}`}
                onClick={() => {
                  this.setState({ results: [] })
                  this.props.onSubmit()
                }}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <h4>{top.content}</h4>
                    <p>{top.title}</p>
                  </li>
                </ul>
              </Link>
            )}
          </div> : null}
      </span>
    )
  }
}
