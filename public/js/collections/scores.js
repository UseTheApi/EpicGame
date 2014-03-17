define([
    'backbone',
    'models/score'
], function(
    Backbone,
    ScoreModel
){

    var ScoresCollection = Backbone.Collection.extend({
    	model : ScoreModel,
    	comparator : function (model) {
    			return -model.get("score");
    	},
    	initialize : function () {	    			
    	}
    });
  	 
  	

    return new ScoresCollection();
});