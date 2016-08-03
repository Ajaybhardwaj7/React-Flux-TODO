var dispatcher = require('flux/lib/dispatcher');
var assign = require('object-assign');

var appDispatcher =  assign(new dispatcher , {

	handleViewAction : function(action){
		
			this.dispatch({ type : action.type , content : action.content });
	}
});

module.exports = appDispatcher;
