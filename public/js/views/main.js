define([
    'backbone',
    'tmpl/main',
    'views/ViewManager'
], function(
    Backbone,
    tmpl,
    VM
){

    var View = Backbone.View.extend({
   
        template: tmpl,
        el: $('#main'),
        viewName: "main",
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            VM.trigger('showView', { name: this.viewName, view : this });
            this.render();
            this.$el.show()
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});