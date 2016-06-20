import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chat from './Chat.jsx';
import ChatHistory from './ChatHistory.jsx';
import Waiting from './Waiting.jsx';

const heightMsg = 65;
const offsetBottomMsgs = 130;

class App extends React.Component {
    constructor() {
        super();
        this.maxMsgs = 0;
        this.state = {
            endpts: { start: 0, end: this.maxMsgs },
            messages: [],
            bot: false
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

    addMessageToHistory(message, waitingForBot) {
        let { messages } = this.state;
        this.setState({
            endpts: { start: Math.max(messages.length-this.maxMsgs, 0), end: messages.length+1 },
            messages: messages.concat([message]),
            bot: waitingForBot
        });
    }

    post(userInput) {
        this.addMessageToHistory({
            msg: userInput,
            user: "me",
            ts: new Date().toString()
        }, true);

        const url = "";
        //$.post( url, { data: value } )
        //  .done(function(data) {
        //      console.log('result', data);
                //this.setState({ bot: false });

        //  })
        //  .fail(function(err) {
        //      console.log('error', err);
                //this.setState({ bot: false });
        //  });

        setTimeout(() => {
            this.addMessageToHistory({
                msg: "What do you mean by " + userInput + "?",
                user: "bot",
                ts: new Date().toString()
            }, false);
        }, 2000);
    }

    render() {
        const { bot, messages, endpts } = this.state;
        this.updateMaxMsgs();
        this.bindEvents();
        const newMessages = messages.slice(endpts.start, endpts.end);
        console.log('newMessages', newMessages);
        return (
            <div>
                <ChatHistory blurbs={ newMessages }/>
                { bot && <Waiting/> }
                <Chat waitingForBot={ bot } userInputRelayer={ this.post.bind(this) }/>
            </div>
         );
    }
}

ReactDOM.render(<App/>, document.getElementById("start"));
