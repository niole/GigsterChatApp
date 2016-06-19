import React, { PropTypes } from 'react';
import Message from './Message.jsx';

const { arrayOf, shape, string } = PropTypes;

const propTypes = {
    blurbs: arrayOf(shape({
        user: string,
        msg: string,
        ts: string
    }))
};

class ChatHistory extends React.Component {
    constructor() {
        super();
    }

    renderBlurb(blurb) {
        return <Message key={ `${Math.random().toString()} ${blurb.ts}` } message={ blurb }/>;
    }

    showMessages(blurbs) {
        return blurbs.map(this.renderBlurb);
    }

    render() {
        const { blurbs } = this.props;
        return (
            <ul
                id="all-messages"
                className="all-messages">
                { this.showMessages(blurbs) }
            </ul>
        );
    }
}

ChatHistory.propTypes = propTypes;
export default ChatHistory;
