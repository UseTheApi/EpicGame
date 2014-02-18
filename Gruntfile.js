module.exports = function (grunt) {
    grunt.initConfig({
        connect: { 
            server: { /* Подзадача */
                options: {
                    keepalive: false, /* ставим false если работаем вместе с watch */
                    port: 8000, /* номер порта */
                    base: 'public' /* публичная директория */
                }
            }

        } ,  /* grunt-contrib-connect */
        fest: {
            templates: { /* Подзадача */
                    files: [{
                        expand: true,
                        cwd: 'templates', /* исходная директория */
                        src: '*.xml', /* имена шаблонов */
                        dest: 'public/js/tmpl' /* результирующая директория */
                    }] },
            options: { 
                template: function (data) { /* формат функции-шаблона */
                     return grunt.template.process(
                            'var <%= name %>Tmpl = <%= contents %> ;',    /* присваиваем функцию-шаблон переменной */
                            {data: data}
                         );
                }
            }
            
        }, /* grunt-fest */
        watch: {
            files: ['templates/*.xml'],
            tasks: ['fest', 'concat'], /* перекомпилировать + concat */
            options: {
                atBegin: true /* запустить задачу при старте */
            }
        },
        concat: {
             options: {
                separator: ';'
            },
             dist: {
                 src: [ 'public/js/lib/*.js', 'public/js/tmpl/*.js', 'public/js/logic/*.js'],
                 dest: 'public/js/compiled/Frontend.js',
            }
        } /* grunt-concat */
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['connect', 'watch']); /* задачи выполняемые автоматически */

};
