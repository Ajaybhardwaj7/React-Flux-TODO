var appDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
module.exports = {

    create : function(content) {
    	appDispatcher.handleViewAction({type : constants.CREATE , content : content })
    },
    toggleWish : function(status){
    	appDispatcher.handleViewAction({type : constants.TOGGLE_WISH , content : status })
    },
    deleteWish : function(id){
    	appDispatcher.handleViewAction({type : constants.DELETE_WISH , content : id})
    },
    resetComplete : function(){
    	appDispatcher.handleViewAction({type : constants.RESET_COMPLETE , content : undefined})	
    },
    markAllComplete : function(){
    	appDispatcher.handleViewAction({type : constants.ALL_COMPLETE , content : undefined})
    },
    deleteAll : function(){
    	appDispatcher.handleViewAction({type : constants.DELETE_ALL , content : undefined})
    }
}