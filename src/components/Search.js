/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'
import { apiUrl } from '../globals'

let cachedPosts

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  render() {
    return (
      <div>
        <input onChange={e => {

          const query = e.target.value.toLowerCase()

          if(query === '') {
            this.setState({
              results: []
            })
            return
          }

          if (cachedPosts) {

            const data = cachedPosts.filter(x => x.content.toLowerCase().startsWith(query))

            this.setState({
              results: data.slice(0, 5)
            })

          } else {
            fetch(`${apiUrl}/posts`, { method: 'POST' })
              .then(res => res.json())
              .then(posts => {

                cachedPosts = posts.reduce((x, y) => {
                  const { title, id } = y
                  return x.concat([
                    { id, title, content: y.title },
                    { id, title, content: y.option1 },
                    { id, title, content: y.option2 }
                  ])
                }, [])
                  .reduce((x, y) => {

                    const { title, id, content } = y
                    const words = content
                      .trim()
                      .split(/\s/)

                    return x.concat(words.map(w => {
                      return {
                        title, id, content: w, fullContent: content
                      }
                    }))
                  }, [])

                const data = cachedPosts.filter(x => x.content.toLowerCase().startsWith(query))

                this.setState({
                  results: data.slice(0, 5)
                })
              })

            if (!query) {
              this.setState({
                results: []
              })
            }
          }
        }} className="prompt" type="text" placeholder={this.props.default}/>
        <i className="search icon"/>
        {this.state.results.length > 0 ?
          <div className="well" style={{
            position: 'fixed',
            zIndex: 5
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
                    <h4>{top.fullContent}</h4>
                    <p>{top.title}</p>
                  </li>
                </ul>
              </Link>
            )}
          </div> : null}
      </div>
    )
  }
}
