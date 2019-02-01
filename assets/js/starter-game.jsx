import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { generateNewStartingState, steps } from './utils';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends Component {
  state = generateNewStartingState();

  componentDidUpdate = (prevProps, prevState) => {
    const {step, choice, tileState} = this.state;
    
    if (step == steps.MISS) {
      setTimeout(() => {
        this.setState({
          step: steps.CHOOSE,
          tileState: {
            ...tileState,
            [choice]: {
              ...tileState[choice],
              hidden: true
            },
            [prevState.choice]: {
              ...tileState[prevState.choice],
              hidden: true
            }
          }
        })
      }, 1000);
    }
  }

  onTileClick = (id, content) => e => {
    const {step, choice, tileState, score} = this.state;

    if (step === steps.MISS) {
      return;
    } else if (step === steps.CHOOSE) {
      this.setState({
        choice: id,
        step: steps.MATCH,
        score: score + 1,
        tileState: {
          ...tileState,
          [id]: {
            ...tileState[id],
            hidden: false,
          }
        }
      })
    } else if (step === steps.MATCH) {
      if (tileState[choice].content == content) {
        this.setState({
          choice: undefined,
          step: steps.CHOOSE,
          score: score + 1,
          tileState: {
            ...tileState,
            [id]: {
              ...tileState[id],
              matched: true,
              hidden: false
            },
            [choice]: {
              ...tileState[choice],
              matched: true
            }
          }
        })
      } else {
        this.setState({
          choice: id,
          step: steps.MISS,
          score: score + 1,
          tileState: {
            ...tileState,
            [id]: {
              ...tileState[id],
              hidden: false
            }
          }
        })
      }
    }
  }

  resetGame = () => {
    if (this.state.step == steps.MISS) {
      return;
    }

    const newState = generateNewStartingState();
    this.setState(newState);
  }

  renderButton = ({content, matched, hidden, id}) => {
    const style = classNames("game__tile", {
      "game__tile--matched": matched,
      "game__tile--show": !hidden,
      "game__tile--error": !hidden && this.state.step === steps.MISS
    });

    return (
      <div key={id} className={style}
      onClick={matched || !hidden ? () => 0: this.onTileClick(id, content)}>
        {hidden ? '' : content}
      </div>
    );
  }
  
  renderTiles = () => (
    <div className="game__board">
      {Object.values(this.state.tileState).map(tile => this.renderButton(tile))}
    </div>
  );

  render() {
    return (
      <div className="game">
        <h1 className="game__title"> Memory Match </h1>
        {this.renderTiles()}
        <div className="game__options">
          <p className="game__score">Score: {this.state.score}</p>
          <button onClick={this.resetGame} className="game__reset">Restart</button>
        </div>
      </div>
    )
  }
}

