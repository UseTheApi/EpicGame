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
        el: $('#page'),

        initialize: function () {
            
        },
        render: function () {
        },
        show: function () {
            console.log(this.Scores.mmm);
            this.$el.html(this.template({Scores : this.Scores.models}));
        },
        hide: function () {
        }

    });

    return new View();
});