var React = require('react');
var ReactDOM = require('react-dom');
var Content = require('./components/main');
require('./styles/style.css');

var Header = React.createClass({
	
	render : function(){
		return <div className = "title"><h1>TODO with React & Flux</h1> <br/><br/> </div>
	}
})
var Component = React.createClass({

						render : function(){
							return <div className='center'><Header></Header><Content></Content></div>
						}
				});

ReactDOM.render(<Component /> , document.getElementById('main'));