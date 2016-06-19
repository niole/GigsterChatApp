import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chat from './Chat.jsx';
import ChatHistory from './ChatHistory.jsx';

const heightMsg = 65;
const offsetBottomMsgs = 66;

class App extends React.Component {
    constructor() {
        super();
        this.maxMsgs = 0;
        this.state = {
            endpts: { start: 0, end: this.maxMsgs },
            messages: []
        };
    }

    componentDidMount() {
        this.updateMaxMsgs();
        this.bindEvents();
    }

    bindEvents() {
        let id;
        if (!this.CH) {
            this.CH = document.getElementById("all-messages");
            if (this.CH) {
                this.CH.addEventListener("mousewheel", (e) => {
                    if (!id) {
                        id = setTimeout(() => {
                            this.updateChatHistory.call(this, e);
                            id = null;
                        }, 10);
                    }
                });
            }
        }
    }

    updateChatHistory(e) {
        const { deltaY } = e;
        const { endpts, messages } = this.state;
        if (messages.length > this.maxMsgs) {
            const { start, end } = endpts;
            if (deltaY > 0) {
                this.setState({endpts: { start: Math.max(start-1, 0), end: Math.max(end-1, this.maxMsgs) }});
            }
            if (deltaY < 0 && deltaY !== -0) {
                this.setState({endpts:
                    { start: Math.min(start+1, messages.length - this.maxMsgs),
                      end: Math.min(end+1, messages.length) }
                });
            }
        }
    }

    updateMaxMsgs() {
        const heightWindow =  window.innerHeight - offsetBottomMsgs;
        this.maxMsgs = Math.floor(heightWindow/heightMsg);
    }

    addMessageToHistory(message) {
        let { messages } = this.state;
        this.setState({
            endpts: { start: Math.max(messages.length-this.maxMsgs-1, 0), end: messages.length },
            messages: messages.concat([message])
        });
    }

    post(userInput) {
        this.addMessageToHistory({
            msg: userInput,
            user: "me",
            ts: new Date().toString()
        });

        const url = "";
        //$.post( url, { data: value } )
        //  .done(function(data) {
        //      console.log('result', data);
        //  })
        //  .fail(function(err) {
        //      console.log('error', err);
        //  });
    }

    render() {
        const { messages, endpts } = this.state;
        this.updateMaxMsgs();
        this.bindEvents();
        const newMessages = messages.slice(endpts.start, endpts.end);
        return (
            <div>
                <ChatHistory blurbs={ newMessages }/>
                <Chat userInputRelayer={ this.post.bind(this) }/>
            </div>
         );
    }
}

ReactDOM.render(<App/>, document.getElementById("start"));
