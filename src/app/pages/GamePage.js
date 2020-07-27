import React, { Component, createRef } from "react";
import noop from "lodash/noop";
import Game from "../Game";

export default class GamePage extends Component {
  gameContainerRef = createRef();

  componentDidMount() {
    const { onMounted = noop } = this.props;

    onMounted(this.gameContainerRef.current);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-vars
    const { game } = this.props;

    // TODO:
    // do something to stop the game
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="game-container" data-testid="game-container">
            <Game ref={this.gameContainerRef} />
          </div>
        </header>
      </div>
    );
  }
}
