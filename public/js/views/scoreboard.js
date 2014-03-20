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
            this.$el.html('<img class="loading" src="/imgs/loading.gif"/>');

            if(localStorage["scores"] != undefined) {
                var scores =  JSON.parse(localStorage["scores"]);
                var totalSaved = 0;

                for(var i=0;i<scores.length;i++) {

                    $.ajax({
                        url : '/scores',
                        type: 'post',
                        data: scores[i],
                        dataType: 'json',
                    })

                    .done(function() {
                        totalSaved++;
                        if(totalSaved == scores.length) { // ok all records saved to server
                            localStorage.removeItem("scores");
                        }
                    })
                }
            }

           
            this.Scores.url = '/scores?limit=5';
            this.Scores.fetch({ 
                success: function() {
               //console.log(view.Scores.models);
                view.$el.html(view.template({Scores : view.Scores.models}));
                }, 
                error : function() {
                view.$el.html(view.template({Scores : view.Scores.models}));
                }
            });
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