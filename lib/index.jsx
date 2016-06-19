var React = require('react');
var ReactDOM = require('react-dom');

var Hw = React.createClass({
    render() {
        return <h1>hello world</h1>;
    }
});

ReactDOM.render(<Hw/>, document.getElementById("start"));
