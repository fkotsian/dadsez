import React, {Component} from 'react'
import {render} from 'react-dom'
import Joke from '../../containers/Joke'
import * as Consts from '../../constants'
import axios from 'axios'

function canIHazAPIJokeUrl(canIHazId) {
  return `${Consts.CANIHAZ_API_BASE_URL}/j/${canIHazId}`
}

class JokeLoader extends Component {
  constructor(props) {
    super(props)

    // normalize Joke data structure
    this.state = {
      canIHazId: props.can_i_haz_id,
      votes: props.votes_count,
      text: false,
      loading: false,
      error: false,
    }

    this.fetchJokeText = this.fetchJokeText.bind(this)
  }

  componentDidMount() {
    this.fetchJokeText(this.state.canIHazId)
  }

  fetchJokeText(canIHazId) {
    this.setState({
      loading: true,
    })

    axios.get(
      canIHazAPIJokeUrl(canIHazId),
      {
        headers: Consts.CANIHAZ_API_HEADERS,
      }
    )
      .then(res => {
        let jokeText = res.data.joke
        this.setState({
          text: jokeText,
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

  render() {
    return (
      <div>
        {
          this.state.loading
            ?
              'Loading your joke!'
            :
              ''
        }
        {
          this.state.error
            ?
              <div className="error">
                Unable to fetch joke! Please try again later.
              </div>
            :
              ''
        }
        {
          this.state.text
            ?
              <Joke
                canIHazId={this.state.canIHazId}
                text={this.state.text}
                votes={this.state.votes}
              />
            :
              ''
        }
      </div>
    )
  }
}

export default JokeLoader
