/**
 * The main entry point to the application.
 */ 
import React, { Component } from 'react';
import uuid from 'uuid';     // install uuid module first via npm
import $ from 'jquery';     // install jquery module first via npm
import Games from './Components/Games'; // create Components folder and Games js file and import here
import AddGame from './Components/AddGame';
var Jumbotron = require('react-bootstrap').Jumbotron;   // from react-bootstrap module, uses bootstrap components
import './App.css';

/** Class representing the main App */
class App extends Component {
  /**
   * Create's the main app state.
   */
  constructor() {
    super();
    this.state = {}
  }

  /**
   * Builds an arry of games and sets them into the state.  To be replaced when API is added to fetch games on the server side.
   */
  getGames () {
    this.setState({games: [
        {
          id: uuid.v4(),
          title: 'Super Mario Bros.',
          platform: 'NES',
          year: 1985,
          own: 'true'
        },
        {
          id: uuid.v4(),
          title: 'Halo',
          platform: 'Xbox',
          year: 2001,
          own: 'false'
        },
        {
          id: uuid.v4(),
          title: 'Journey',
          platform: 'PS3',
          year: 2009,
          own: 'true'
        }
    ]});
/*
    $.ajax({
      url: 'https://www.giantbomb.com/api/search/?api_key=581eca527348fbcf1d87dacb2bf6b5111bd8af87&format=json&query=%22mass%20effect%22&resources=game',
      dataType: 'json',
      cache: false,
      success: function (data) {
        let gamesData = data.results.map(game => {
          return {
            id: uuid.v4(),
            title: game.name,
            platform: game.platforms[0].name,
            year: game.original_releaes_date
          }
        });
        this.setState({games:gamesData});
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
*/
  }

  /**
   * Lifecycle function.  Fires immediately before each page render.
   */
  componentWillMount() {
    this.getGames();
  }

  /**
   * Lifecycle function.  Fires immediately after each page render.
   */
  componentDidMount () {
    this.getGames();
  }

  /**
   * Event handler for adding a game.  Passed up the component chain from GameItem.  Adds the new game to the state.
   * @param {object} game - An object holding a new game's data values.
   */
  handleAddGame (game) {
    let games = this.state.games;
    games.push(game);
    this.setState({games:games});
  }

  /**
   * Event handler for removing a game.  Passed up the component chain from GameItem.  Removes the game from the state.
   * @param {string} id - The id string of the game to be removed.
   */
  handleRemoveGame (id) {
    let games = this.state.games;
    let index = games.findIndex(x => x.id);
    games.splice(index, 1);
    this.setState({games:games});
  }

  /**
   * Main app render function.  In the return, it must only define a single top level div.
   * @return {html} The html div to be displayed.
   */
  render() {
    return (
      // only one div may be at the top level of the Render function return
      <div className="App">
        <Jumbotron>
          <h1>Welcome to the Game Chest!</h1>
          <p>Create and manage your video game collection</p>
        </Jumbotron>
        <AddGame addGame={this.handleAddGame.bind(this)}/>
        <h3>Game Chest</h3>
        <Games games={this.state.games} onRemove={this.handleRemoveGame.bind(this)}/>
      </div>
    );
  }
}

export default App;
