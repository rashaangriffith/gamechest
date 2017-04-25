import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';   // install prop-types for validation
var Form = require('react-bootstrap').Form;   // from react-bootstrap module, uses bootstrap components

/** Class representation of the AddGame feature. */
class AddGame extends Component {
    /**
     * Creates the module's state.
     */
    constructor () {
        super();

        this.state = {
            newGame: {}
        }
    }
    
    static defaultProps = {
        platforms: ['NES', 'SNES', 'Xbox', 'PS1', 'PS2', 'PS3']
    }

    /**
     * Event handler that validates the title field and adds a new game to the state.
     * @param {event} e 
     */
    handleSubmit (e) {
        console.log("Submitted");

        if (this.refs.title.value === '') {
            alert('Please enter a title');
        } else {
            this.setState({newGame: {
                id: uuid.v4(),
                title: this.refs.title.value,
                platform: this.refs.platform.value
            }}, function () {
                //console.log(this.state);
                // send the state up the component chain
                this.props.addGame(this.state.newGame);
            });
        }
        e.preventDefault();
    }

    /**
     * Displays the GameItem's title and platform along with a link to remove it.  
     */
    render() {

        let platformOptions = this.props.platforms.map(platform => {
            return <option key={platform} value={platform}>{platform}</option>
        });

        return (
        // only one div may be at the top level of the Render function
        <div>
            <h3>Add Game</h3>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label>Title</label>
                    <br/>
                    <input type="text" ref="title" />
                </div>
                <div>
                    <label>Platform</label>
                    <br/>
                    <select ref="platform">
                        {platformOptions}
                    </select>
                </div>
                <input type="submit" value="Submit" />
            </Form>
        </div>
        );
    }                             
}

/** property validation, this is basically a schema for the property types that can be added to this component */
AddGame.propTypes = {
  platforms: PropTypes.array,
  addGame: PropTypes.func
}

export default AddGame;
