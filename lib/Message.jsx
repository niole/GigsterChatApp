import React, { PropTypes } from 'react';

const { shape, string } = PropTypes;

const propTypes = {
    message: shape({
        user: string,
        msg: string,
        ts: string
    })
};

class Message extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { message } = this.props;
        const { user, msg, ts } = message;
        return (
            <li className="user-message">
                {user}{msg}{ts}
            </li>
        );
    }
}

Message.propTypes = propTypes;
export default Message;

