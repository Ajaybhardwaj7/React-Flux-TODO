var  React = require('react');
var action = require('../actions/action');
var store = require('../store/store');
var List = require('./list');
var classnames = require('classnames');

const ENTER_KEYCODE = 13;

var WishStatus = React.createClass({

	render  : function(){

			var items = this.props.items;
			var totalItems = items.length;
			//Calculating Pending and Completed Items
			var pendingItems =0;
			var completedItems = 0;
			if(items.length){
					items.forEach(function(item){
						if(item.complete == false){
							pendingItems++;
						}else { 
							completedItems++;
						} 
					})


					return <div className = "wishStatus"><div className= "float-left">Pending: {pendingItems}</div><div className= "center">Completed: {completedItems}</div><div className = "float-right">Total: {totalItems}</div></div>
			}
			else { return <div></div> }
	}
});
var WishActions = React.createClass({

	render  : function(){

			var items = this.props.items;
			var totalItems = items.length;
			//Calculating Pending and Completed Items
			var pendingItems =0;
			var completedItems = 0;

			if(items.length){
					items.forEach(function(item){
							if(item.complete == false){
								pendingItems++;
							}else { 
								completedItems++;
							} 
					})

					return <div className = "wishStatus wish-actions"><div className= "float-left" onClick = {this._onCompleteAll}>All Complete</div><div className= "center"  onClick = {this._onClearComplete}>Clear Complete</div><div className = "float-right" onClick = {this._onDeleteAll}>Delete All</div></div>
			}
			else return <div></div>
			
	},
	_onCompleteAll : function(){
		action.markAllComplete();
	},
	_onClearComplete : function(){
		action.resetComplete();
	},
	_onDeleteAll : function(){
		action.deleteAll();
	}

});
module.exports =  React.createClass({	

						getInitialState : function(){
							return { items : store.getAppStateData() }
						},
						render : function(){

							var classes = classnames('header' , {});

							return  <content><input type="text" className= {classes} onBlur = { this._onBlur}  onKeyDown = {this._onKeyDown} placeholder="Write down your wishlist..."/>
							<WishStatus items= {this.state.items}></WishStatus><List items= {this.state.items} ></List>
							<WishActions items= {this.state.items}></WishActions>
							</content>
						},
						componentDidMount : function(){
							store.attachListeners(this._change);
						},
						componentWillUnMount : function(){
							store.removeListeners();
						},
						_change : function(){
							
							this.setState({ items : store.getAppStateData() });
						},
						_onBlur : function(event){
							if(event.target.value != "" && event.target.value.trim() != ""){
								action.create(event.target.value);
								event.target.value = "";	
							}else {
								event.target.value = "";
								alert('Please enter value')
							}
							
						},
						_onKeyDown : function(event){
							if(event.keyCode === ENTER_KEYCODE){
								if(event.target.value != "" && event.target.value.trim() != ""){
									action.create(event.target.value);
									event.target.value = "";
								}else {
									event.target.value = "";
									alert('Please enter value')
								}
							}
						}


					})

