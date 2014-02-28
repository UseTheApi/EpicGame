define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    ScoreCollection
){

    var View = Backbone.View.extend({

        template: tmpl,
        Scores : ScoreCollection,
        el: $('.page'),

        initialize: function () {
            
        },
        render: function () {
            this.$el.html(this.template({Scores : this.Scores.models}));
        },
        show: function () {
            this.render();
        },
        hide: function () {
        }

    });

    return new View();
});