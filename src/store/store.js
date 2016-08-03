var action = require('../actions/action');
var appDispatcher = require('../dispatcher/dispatcher');
var events = require('events')
var emitter = new events.EventEmitter();
var constants = require('../constants/constants');

"use strict";

var _appState = { config : {} , list : [] };


//CREATE WISH LIST EVENT
var create_list = function(text){

	_appState.list.push({
		content : text,
		id : Date.now(),
		complete: false
	})
};

//TOGGLE WISH EVENT
var toggleWish  = function(item){
	_appState.list =  _appState.list.map(function(original){
		if(original.id == item.id) { original.complete = item.status; return original}
		else return original;
	})	
};

//DELETE WISH LIST
var deleteWish = function(item){
	_appState.list.forEach(function(original , index , self){
		if(original.id == item.id) { self.splice(index , 1)}
	})
};

//RESET ALL COMPLETE TO INITIAL
var resetCompleteWishes = function(){
	_appState.list =	_appState.list.map(function(item){
							item.complete = false;
							return item;
						})
};

//MARK ALL WISHES COMPLETE
var markAllComplete = function(){
	_appState.list = _appState.list.map(function(item){
							item.complete = true;
							return item;
						})
};

//DELETE ALL WISHES
var deleteAllWishes = function(){
	 	_appState.list = [];
};

var store = {

	getAppStateData : function(){
		return _appState.list
	},

	attachListeners : function(callback){
		emitter.addListener(constants.CREATE , callback);
		emitter.addListener(constants.TOGGLE_WISH , callback);
		emitter.addListener(constants.DELETE_WISH , callback);
		emitter.addListener(constants.RESET_COMPLETE , callback);
		emitter.addListener(constants.ALL_COMPLETE , callback);
		emitter.addListener(constants.DELETE_ALL , callback);
	},
	removeListeners : function(){
		emitter.removeListener();
	},
	
	dispatcherIndex : appDispatcher.register(function(action){
		var actionType  = action.type;
		switch(actionType) {
			case constants.CREATE : {
				create_list(action.content);
				emitter.emit(constants.CREATE); 
				break;
			}
			case constants.TOGGLE_WISH : {
				toggleWish(action.content);
				emitter.emit(constants.TOGGLE_WISH);
				break;
			}
			case constants.DELETE_WISH : {
				deleteWish(action.content);
				emitter.emit(constants.DELETE_WISH);
				break;
			}
			case constants.RESET_COMPLETE : {
				resetCompleteWishes();
				emitter.emit(constants.DELETE_WISH);
				break;
			}
			case constants.ALL_COMPLETE : {
				markAllComplete();
				emitter.emit(constants.ALL_COMPLETE);
				break;
			}
			case constants.DELETE_ALL : {
				deleteAllWishes();
				emitter.emit(constants.DELETE_ALL);
				break;
			}
		}
	})
	
};

module.exports = store;

