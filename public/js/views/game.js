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
        el: $('.page'),
        game: null,
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template);
            this.game = new Game($('.game__scene')[0]);
        },
        show: function () {
            this.render();
        },
        hide: function () {
            this.game.Stop()
        }

    });

    return new View();
});