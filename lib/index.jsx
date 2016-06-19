import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chat from './Chat.jsx';
import ChatHistory from './ChatHistory.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };
    }

    addMessageToHistory(message) {
        let { messages } = this.state;
        this.setState({ messages: messages.concat([message]) });
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
        const { messages } = this.state;

        return (
            <div>
                <ChatHistory blurbs={ messages }/>
                <Chat userInputRelayer={ this.post.bind(this) }/>
            </div>
         );
    }
}

ReactDOM.render(<App/>, document.getElementById("start"));
