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
  	 
  	 var models = [{name : 'andrew', score : 322}, {name : 'eee', score : 334}, 
  	 			   {name : 'bbb', score : 13}, 	   {name : 'h4ck', score : 1337}
  	 			   ];

    return new ScoresCollection(models);
});