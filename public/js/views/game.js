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
        gameCanvas: 'game__scene',
        el: $('.page'),
        initialize: function () {
        },
        render: function () {
        },
        show: function () {
            this.$el.html(this.template);
            Game.run(document.getElementById(this.gameCanvas));
        },
        hide: function () {
        }

    });

    return new View();
});