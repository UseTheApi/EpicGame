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
        initialize: function () {
        },
        render: function () {
        },
        show: function () {
            this.$el.html(this.template);
            Game($('.game__scene')[0]);
        },
        hide: function () {
        }

    });

    return new View();
});