var React = require('react');
var classnames = require('classnames');
var action = require('../actions/action');
var store = require('../store/store');

var StatusImg = React.createClass({
	getInitialState : function(){
		return { status : this.props.identity}
	},
	render : function(){

		var classes = classnames( { "image-todo" : true , "complete" : this.state.status.complete  })
		return <div onClick = {this._onClick} className = {classes} ></div>
	},

	_onClick : function(){
		this.state.status.complete = !this.state.status.complete;
		action.toggleWish({id : this.state.status.id , status : this.state.status.complete});
	}
});
var DeleteImg = React.createClass({
	
	render : function(){

		return <div onClick = {this._onClick} className = "delete_img" ></div>
	},

	_onClick : function(){
		
		action.deleteWish({id : this.props.identity.id });
	}
});
module.exports = React.createClass({
					
					render : function(){
						var items = this.props.items ; 
						var list = items.map(function(value){
							var classes = classnames({strike : value.complete})
							return <li key = {value.id}><StatusImg  identity = {value}></StatusImg><p className={classes}>{value.content}</p><DeleteImg identity = {value}></DeleteImg></li>
						})
						return <ul> {list} </ul>
					}

				})