define([
    'backbone',
    'tmpl/game',
    'game/gameMain'
], function(
    Backbone,
    tmpl,
    Game
){

    var View = Backbone.View.extend({

        template: tmpl,
        el: $('#page'),
        gameCanvas: 'gameScene',

        initialize: function () {
            // TODO
        },
        render: function () {
        },
        show: function () {
            this.$el.html(this.template);
            Game.run(document.getElementById(this.gameCanvas));
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});