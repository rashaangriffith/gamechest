import React, { Component } from 'react';
import PropTypes from 'prop-types';   // install prop-types for validation

/** Class representation of an individual GameItem */
class GameItem extends Component {

  /**
   * Passes the onRemove property up the component chain to Game.
   * @param {string} id 
   */
  removeGame (id) {
      this.props.onRemove(id);
  }

  /**
   * Displays the GameItem's title and platform along with a link to remove it.  
   */
  render() {
    console.log(this.props);
    return (
      // only one div may be at the top level of the Render function
      <li className="Game">
        {this.props.game.title} ({this.props.game.platform}) <a href="#" onClick={this.removeGame.bind(this, this.props.game.id)}><strong>(X)</strong></a>
      </li>
    );
  }
}

/** property validation, this is basically a schema for the property types that can be added to this component */
GameItem.propTypes = {
  games: PropTypes.object,
  onRemove: PropTypes.func
}

export default GameItem;
