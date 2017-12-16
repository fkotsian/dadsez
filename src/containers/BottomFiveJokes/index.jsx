import React, {Component} from 'react'
import {render} from 'react-dom'
import JokeLoader from '../../containers/JokeLoader'
import * as Consts from '../../constants.js'
import axios from 'axios'

class BottomFiveJokes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: false,
      jokes: [],
    }

    this.requestBottomFiveJokes = this.requestBottomFiveJokes.bind(this)
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
        this.setState({
          jokes: res.data.jokes,
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
              this.state.jokes
                .map(j => (
                  <JokeLoader key={j.can_i_haz_id} {...j} />
                ))
            :
              ''
        }
      </div>
    )
  }
}

export default BottomFiveJokes
