import React, { PropTypes } from 'react';
import Message from './Message.jsx';

const heightMsg = 43;
const offsetBottomMsgs = 66;
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

    getScrollStyle(totalMessages) {
        const heightMsgs = totalMessages*heightMsg;
        const heightOpenSpace =  window.innerHeight - offsetBottomMsgs;

        if (heightMsgs > heightOpenSpace) {
            return { overflowY: "scroll", height: heightOpenSpace };
        }
        return {};
    }

    render() {
        const { blurbs } = this.props;
        return (
            <ul
                style={ this.getScrollStyle(blurbs.length) }
                className="all-messages">
                { this.showMessages(blurbs) }
            </ul>
        );
    }
}

ChatHistory.propTypes = propTypes;
export default ChatHistory;
