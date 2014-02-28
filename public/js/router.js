define([
    'backbone',
    'views/game', 
    'views/scoreboard', 
    'views/main'
], function(
    Backbone,
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
            if(current == 'game') {
             game.hide();   
            } 
            main.show();   
            current = 'main';
        },
        scoreboardAction: function () {
            scoreboard.show();
            current = 'scoreboard';
        },
        gameAction: function () {
            game.show();
            current = 'game';
        }
    });
    return new Router();
});