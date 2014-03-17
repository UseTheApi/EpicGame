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
            var view = this;
            this.Scores.url = '/scores';
            this.Scores.fetch({ success: function() {
              console.log(view.Scores.models);
                view.$el.html(view.template({Scores : view.Scores.models.slice(0,5)}));
            }});
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