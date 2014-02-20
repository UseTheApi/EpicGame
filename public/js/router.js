define([
'backbone','views/game', 'views/scoreboard', 'views/main'], function(Backbone, game, scoreboard, main
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.show();
        },
        scoreboardAction: function () {
            // TODO
        },
        gameAction: function () {
            game.show();
        }
    });

    return new Router();
});