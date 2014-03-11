define([
    'backbone',
    'tmpl/game',
    'game/gameMain',
    'views/ViewManager'
], function(
    Backbone,
    tmpl,
    Game,
    VM
){

    var View = Backbone.View.extend({

        template: tmpl,
        el: $('#game'),
        game: null,
        viewName: "game",
        initialize: function () {
       
        },
        render: function () {
            this.$el.html(this.template);
            this.game = new Game($('.game__scene')[0]);
        },
        show: function () {
            VM.trigger('showView', { name: this.viewName, view : this });
            this.render();
            this.$el.show();
        },
        hide: function () {
            this.game.Stop();
            this.$el.hide();
        }

    });

    return new View();
});