import React, {Component} from 'react'
import {render} from 'react-dom'
import Joke from '../../containers/Joke'
import axios from 'axios'
import * as Consts from '../../constants.js'

function canIHazAPIJokeUrl(canIHazId) {
  return `${Consts.CANIHAZ_API_BASE_URL}/j/${canIHazId}`
}

class BottomFiveJokes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: false,
      jokes: [],
    }

    this.requestBottomFiveJokes = this.requestBottomFiveJokes.bind(this)
    this.fetchJokeInfo = this.fetchJokeInfo.bind(this)
  }

  componentDidMount() {
    this.requestBottomFiveJokes()
  }

  requestBottomFiveJokes() {
    this.setState({
      loading: true,
    })

    axios.get(
      Consts.DADSEZ_API_JOKES_BOTTOM_FIVE
    )
      .then(res => {
        return res.data.joke_ids
      })
      .then(jokeIds => {
        return this.fetchJokeInfo(jokeIds)
      })
      .then(_ => {
        this.setState({
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
        })
      })
  }

  fetchJokeInfo(jokeIds) {
    jokeIds.map(jId => {
      // request joke from API and add it to the list
      axios.get(
        canIHazAPIJokeUrl(jId),
        {
          headers: Consts.CANIHAZ_API_HEADERS,
        }
      )
        .then(res => {
          let newJoke = res.data
          this.setState({
            jokes: [].concat(this.state.jokes).concat(newJoke),
          })
        })
    })
  }

  render() {
    return (
      <div>
        <h1>Bottom 5 Jokes!</h1>
        {
          this.state.loading
            ?
              'Loading Bottom 5 Jokes!'
            :
              ''
        }
        {
          this.state.error
            ?
              <div className="error">
                Unable to fetch bottom 5 jokes! Please try again later.
              </div>
            :
              ''
        }
        {
          this.state.jokes.length > 0
            ?
              this.state.jokes.map(j => (
                <Joke key={j.id} {...j} />
              ))
            :
              ''
        }
      </div>
    )
  }
}

export default BottomFiveJokes
