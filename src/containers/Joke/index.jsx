import React, {Component} from 'react'
import {render} from 'react-dom'
import JokeButtons from '../../containers/JokeButtons'
import JokeText from '../../components/JokeText'

class Joke extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canIHazId: props.id,
      text: props.joke,
    }
  }

  render() {
    return (
      <div>
        <JokeButtons canIHazId={this.state.canIHazId} />
        <JokeText text={this.state.text} />
      </div>
    )
  }
}

export default Joke
