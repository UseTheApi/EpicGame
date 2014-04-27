module.exports = function (grunt) {

    grunt.initConfig({

        requirejs: { 
              build: { /* Подзадача */
              options: {
                  almond: true,
                  baseUrl: "public/js",
                  mainConfigFile: "public/js/main.js",
                  name: "main",
                  optimize: "none",
                  out: "public/js/build/main.js"
              }
           }
        },

        uglify: {
            build: { /* Подзадача */
                files: [{
                    src: ['public/js/build.js'],
                    dest: 'public/js/build.min.js'
                }]
            }
        },

        concat: {
            build: { /* Подзадача */
                options: {
                    separator: ';\n', /* между двумя файлами */
                },
                    src: ['public/js/lib/almond.js','public/js/build/main.js'],
                    dest: 'public/js/build.min.js' /* сохраняем склейку */
            }
        },

        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },

            css: {
                files: 'public/css/*.sass',
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },

            express: {
                files:  [
                    'routes/**/*.js',
                    'app.js'
                ],
                tasks:  [ 'express' ],
                options: {
                    spawn: false
                }
            },
            server: {
                files: [
                    'public/js/**/*.js',
                    'public/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },
        express: {
            server: {
                options: {
                    livereload: true,
                    port: 8000,
                    script: 'app.js'
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },

        sass : {
            css: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: 'main.sass',
                    dest: 'public/css',
                    ext: '.css'
                }]

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['express', 'watch']);
    grunt.registerTask('build',['fest', 'requirejs:build','concat:build', 'uglify:build']);

};
