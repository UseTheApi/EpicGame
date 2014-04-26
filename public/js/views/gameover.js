define([
    'backbone',
    'tmpl/gameover',
    'handlers/gameoverHandler'
], function(
    Backbone,
    tmpl,
    GOHandler
){

    var View = Backbone.View.extend({

        template: tmpl,
        el: '#gameover',
        initialize: function () {
            this.$el.hide(); // dirty fix, dunno
        },
        render: function (score) {
            this.$el.html(this.template({
                score: score
            }));
            $("#gameoverForm").on("submit" , GOHandler);
        },
        show: function (score) {
            this.render(score);
            this.$el.show();
        },  
        hide: function () {
            this.$el.hide();
        }
    });

    return View;
});