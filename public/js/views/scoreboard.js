define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/ViewManager'
], function(
    Backbone,
    tmpl,
    ScoreCollection,
    VM
){

    var View = Backbone.View.extend({

        template: tmpl,
        Scores : ScoreCollection,
        el: $('#scoreboard'),
        viewName: "scoreboard",

        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template({Scores : this.Scores.models}));
        },
        show: function () {
            VM.trigger('showView', { name: this.viewName, view : this });
            this.render();
            this.$el.show();
        },
        hide: function () {
           this.$el.hide();
        }

    });

    return new View();
});