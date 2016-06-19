import React from 'react';

const { PropTypes } = React;
const { func } = PropTypes;

const propTypes = {
    userInputRelayer: func.isRequired
};

class ChatInput extends React.Component {
    constructor() {
        super();
    }

    submit(userInputRelayer, e) {
        if (e.which === 13) {
            const value = e.target.value;
            userInputRelayer(value);
        }
    }

    render() {
        const { userInputRelayer } = this.props;
        return (
            <input
                  className="chat-input"
                  onKeyPress={ this.submit.bind(this, userInputRelayer) }
                  placeholder="ask a question"/>
         );
    }
}
ChatInput.propTypes = propTypes;
module.exports = ChatInput;
