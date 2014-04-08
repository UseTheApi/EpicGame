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
            this.render();
            this.hide();
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            VM.trigger('showView', { name: this.viewName, view : this });
            this.$el.show();
            this.game = new Game($('.game__scene')[0]);
        },
        hide: function () {
            if(this.game != null)
            this.game.Stop();
            this.$el.hide();
        }
    });

    return new View();
});