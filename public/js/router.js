define([
'backbone','views/game', 'views/scoreboard', 'views/main'], function(Backbone, game, main, scoreboard
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            
        },
        scoreboardAction: function () {
            // TODO
        },
        gameAction: function () {
            
        }
    });

    return new Router();
});