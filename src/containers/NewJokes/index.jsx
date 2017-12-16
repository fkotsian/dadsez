import React, {Component} from 'react'
import {render} from 'react-dom'
import Joke from '../../containers/Joke'
import axios from 'axios'
import * as Consts from '../../constants.js'

function randomPage() {
  return Math.floor(
    Math.random(Consts.CANIHAZ_API_SEARCH_PAGE_COUNT) * Consts.CANIHAZ_API_SEARCH_PAGE_COUNT
  ) + 1
}

function normalizeCanIHazJoke(canIHazJoke) {
  return {
    canIHazId: canIHazJoke.id,
    text: canIHazJoke.joke,
  }
}

class NewJokes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      jokes: [],
    }

    this.requestRandomJokes = this.requestRandomJokes.bind(this)
  }

  componentDidMount() {
    this.requestRandomJokes()
  }

  randomCanIHazAPIPageUrl() {
    return `${Consts.CANIHAZ_API_SEARCH_URL}&page=${randomPage()}`
  }

  requestRandomJokes() {
    axios.get(
      this.randomCanIHazAPIPageUrl(),
      {
        headers: Consts.CANIHAZ_API_HEADERS,
      }
    )
      .then(res => {
        this.setState({
          jokes: res.data && res.data.results.map(j => normalizeCanIHazJoke(j)),
        })
      })
      .catch(err => {
        this.setState({
          error: err,
        })
      })
  }

  render() {
    return (
      <div>
        <h1>Random Jokes</h1>
        <button
          onClick={this.requestRandomJokes}
        >
          Gimme More Jokes!
        </button>
        {
          this.state.error
            ?
              <div className="error">
                Unable to fetch new jokes! Please try again later.
              </div>
            :
              ''
        }
        {
          this.state.jokes.map(j => (
            <Joke key={j.canIHazId} {...j} />
          ))
        }
      </div>
    )
  }
}

export default NewJokes
