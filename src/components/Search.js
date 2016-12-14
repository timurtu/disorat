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
      loading: false,
      results: []
    }
  }

  render() {
    return (
      <div style={{
        position: 'fixed',
        left: '5.5em',
        zIndex: 4,
        top: '.5em'
      }} className={`ui right aligned category search ${this.state.loading ? 'loading' : ''}`}>
        <div className="ui icon input">
          <input onChange={e => {

            const query = e.target.value.toLowerCase()
            this.setState({ loading: true })

            if (cachedPosts) {

              const data = cachedPosts.filter(x => x.content.toLowerCase().startsWith(query))

              this.setState({
                loading: false,
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
                    loading: false,
                    results: data.slice(0, 5)
                  })
                })

              if (!query) {
                this.setState({
                  loading: false,
                  results: []
                })
              }
            }
          }} className="prompt" type="text" placeholder={this.props.default}/>
          <i className="search icon"/>
        </div>
        {this.state.results.length > 0 ? <div style={{ position: 'fixed' }}>
          <div className="ui inverted segment">
            <div className="ui inverted relaxed divided list">
              {this.state.results.map((top, i) =>
                <Link to={`/${top.id}`} key={i} className="item" onClick={() => {
                  this.setState({ results: [] })
                }}>
                  <div style={{ minWidth: '10em', overflowWrap: 'break-word' }} className="content">
                    <div className="header">{top.fullContent}</div>
                    {top.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div> : null}
      </div>
    )
  }
}
