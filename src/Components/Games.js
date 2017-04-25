import React, { Component } from 'react';
import GameItem from './GameItem';
import PropTypes from 'prop-types';   // install prop-types for validation

/** Class representation of a list of Games */
class Games extends Component {

  /**
   * Passes the onRemove property up the component chain to App.
   * @param {string} id 
   */
  removeGame (id) {
    this.props.onRemove(id);
  }

  /**
   * Displays each game information injected from GameItem.  
   */
  render() {
    let gameItems;

    if (this.props.games) {
      gameItems = this.props.games.map(game => {
        //console.log(game);

        return (
          <GameItem key={game.title} game={game} onRemove={this.removeGame.bind(this)} />
        );
      });
    }

    console.log(this.props);
    return (
      // only one div may be at the top level of the Render function return
      <div className="Games">
        {gameItems}
      </div>
    );
  }
}

/** property validation, this is basically a schema for the property types that can be added to this component */
Games.propTypes = {
  games: PropTypes.array,
  onRemove: PropTypes.func
}

export default Games;
