/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      results: []
    }
  }

  componentDidMount() {
    $('select.dropdown').dropdown()
  }

  render() {
    return (
      <div style={{
        display: 'table',
        margin: '.25em 1.65em'
      }} className={`ui right aligned category search ${this.state.loading ? 'loading' : ''}`}>
        <div className="ui icon input">
          <input onChange={e => {

            const query = e.target.value.toLowerCase()
            this.setState({ loading: true })

            fetch('/posts', { method: 'POST' })
              .then(res => res.json())
              .then(posts => {

                const data = posts.reduce((x, y) => {
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
                        title, id, content: w
                      }
                    }))
                  }, [])
                .filter(x => x.content.toLowerCase().startsWith(query))

                this.setState({
                  loading: false,
                  results: data.slice(0, 5)
                })

                if (!query) {
                  this.setState({ results: [] })
                }
              })
              .catch(err => console.error(err))

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
                  <div style={{ minWidth: '10em' }} className="content">
                    <div className="header">{top.content}</div>
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
