import React, {Component} from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import * as Consts from '../../constants.js'

class JokeButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canIHazId: props.canIHazId,
      votes: 0,
      loading: false,
    }
  }

  componentDidMount() {
    // fetch vote count from API
    this.registerJokeAndGetVoteCount(this.state.canIHazId)
  }

  vote(points) {
    axios.post(
      Consts.DADSEZ_API_VOTES_BASE,
      {
        data: {
          can_i_haz_id: this.state.canIHazId,
          points: points,
        }
      }
    )
      .then(res => {
        this.setState({
          votes: this.state.votes + points,
        })
      })
      .catch(err => {
        console.log("ERROR VOTING!")
        console.log(err)
      })
  }

  registerJokeUrl(canIHazId) {
    return `${Consts.DADSEZ_API_JOKES_BASE}/${canIHazId}`
  }

  registerJokeAndGetVoteCount(canIHazId) {
    this.setState({
      loading: true,
    })
    axios.post(
      this.registerJokeUrl(canIHazId)
    )
      .then(res => {
        this.setState({
          votes: res.data && res.data.vote_count,
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: Consts.CANNOT_FETCH_VOTE_COUNT,
        })
      })
  }


  render() {
    return (
      <div>
        <button
          onClick={() => this.vote(1)}
        >Up!</button>
        {
          this.state.loading
            ?
              'loading!'
            :
              <span>Votes: {this.state.votes}</span>
        }
        <button
          onClick={() => this.vote(-1)}
        >Down!</button>
      </div>
    )
  }
}

export default JokeButtons
