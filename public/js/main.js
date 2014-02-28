require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy: "lib/classy"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone' /* экспортируемая переменная */
        },
        'underscore': {
            exports: '_'
        },
        'classy' : {
            exports: 'Class'
        }
    }
});

define([
    'router'
], function(
    router
){
    Backbone.history.start();
});
