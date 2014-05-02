module.exports = function (grunt) {

    grunt.initConfig({

        requirejs: { 
              build_main: { /* Подзадача */
              options: {
                  almond: true,
                  baseUrl: "public/js",
                  mainConfigFile: "public/js/main.js",
                  name: "main",
                  optimize: "none",
                  out: "public/js/build/main.js"
              }
           }, 
               build_joystick: {
                options: {
                    almond: true,
                    baseUrl: 'public/client',
                    mainConfigFile: 'public/client/joystick.js',
                    name: 'joystick',
                    optimize: 'none',
                    out: 'public/client/build/main.js'
                }
            }
        },

        uglify: {
            build_main: { /* Подзадача */
                files: [{
                    src: ['public/js/build.js'],
                    dest: 'public/js/build.min.js'
                }]
            },

            build_joystick: { /* Подзадача */
                files: [{
                    src: ['public/client/build.js'],
                    dest: 'public/client/build.min.js'
                }]
            }
        },

        concat: {
                options: {
                    separator: ';\n', /* между двумя файлами */
                },
            build_main: { /* Подзадача */
                    src: ['public/js/lib/almond.js','public/js/build/main.js'],
                    dest: 'public/js/build.js' /* сохраняем склейку */
            }, 
            build_joystick: { /* Подзадача */
                    src: ['public/js/lib/almond.js','public/client/build/main.js'],
                    dest: 'public/client/build.js'
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
            css_min: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: 'main.sass',
                    dest: 'public/css',
                    ext: '.css'
                }],
                options: {
                    style: 'compressed'
                }
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: 'main.sass',
                    dest: 'public/css',
                    ext: '.css'
                }],
                options: {
                }
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
    grunt.registerTask('build',['fest', 'sass:css_min', 'requirejs:build_main', 'requirejs:build_joystick','concat:build_main', 'concat:build_joystick', 'uglify:build_main', 'uglify:build_joystick']);

};
