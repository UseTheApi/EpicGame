define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
   
        template: tmpl,
        el: $('.page'),
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});