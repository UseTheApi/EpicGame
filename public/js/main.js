require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy: "lib/classy",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        "socket.io": "/socket.io/socket.io"
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
            exports: 'Class',
        "socket.io": {
            exports: "io"
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
