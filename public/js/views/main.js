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
            this.render();
            this.hide();
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            VM.trigger('showView', { name: this.viewName, view : this });
            this.$el.show()
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});