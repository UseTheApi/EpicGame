define([
    'backbone',
    'views/ViewManager',
    'views/game', 
    'views/scoreboard', 
    'views/main',
], function(
    Backbone,
    ViewManager,
    game, 
    scoreboard,
    main
){

    var current = '';
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
            scoreboard.show();
        },
        gameAction: function () {
            game.show();
        }
    });
    return new Router();
});