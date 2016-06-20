import React, { PropTypes } from 'react';
import Message from './Message.jsx';
import Feature from './Feature.jsx';

const { array, arrayOf, shape, string } = PropTypes;

const propTypes = {
    blurbs: arrayOf(shape({
        user: string,
        msg: string,
        ts: string
    })),
    features: array
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

    showFeatures(features) {
        return features.map( (feat, i) => {
            return <Feature index={ i } key={`feature-${i}`} feature={feat}/>;
        });
    }

    shouldScroll(features) {
        return features.length*65 > window.innerHeight-130;
    }

    render() {
        const { features, blurbs } = this.props;
        let scroll = "";
        let scrollStyle = {};
        if (this.shouldScroll(blurbs)) {
            scroll = "scroll-vert";
            scrollStyle = { height: window.innerHeight-130 };
        }

        return (
            <div className="msgs-window">
                <ul
                    style={ scrollStyle }
                    id="all-messages"
                    className={`all-messages ${scroll}`}>
                    { this.showMessages(blurbs) }
                </ul>
                { this.showFeatures(features) }
           </div>
        );
    }
}

ChatHistory.propTypes = propTypes;
export default ChatHistory;
