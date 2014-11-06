module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['watch']);

    //grunt.registerTask('default', []);

    // inicjalizacja konfiguracji zadań
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        distpath: "dist",
        uglify  : {
            build : {
                src     : ['**/*.js', '!**/*.min.js'],
                cwd     : 'src/dev/js/',
                dest    : 'src/dev/js/min/',
                expand  : true,
                rename  : function (dest, src) {
                    // wyciągnij z ciągu ścieżkę do folderu
                    var folder    = src.substring(0, src.lastIndexOf('/'));
                    // wyciągnij z ciągu nazwę pliku
                    var filename  = src.substring(src.lastIndexOf('/'), src.length);
                    // z nazwy pliku wyciągnij samą nazwę bez rozszerzenia
                    filename  = filename.substring(0, filename.lastIndexOf('.'));

                    // zwróć nową ścieżkę z nową nazwą pliku zminifikowanego
                    return dest + folder + filename + '.min.js';
                }
            }
        },
        cssmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dev/css/min',
                    ext: '.min.css'
                }]
            }
        },
        watch : {
            js : {
                files : 'src/dev/js/*.js',
                tasks   : ['uglify']
            },
            css : {
                files : 'src/dev/css/*.css',
                task : ['cssmin']
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: "src/dev/html/", src: "*.html", dest: "dist/p/"},
                    {expand: true, cwd: "src/dev/js/min", src: "*", dest: "dist/js/"},
                    {expand: true, cwd: "src/dev/css/min", src: "*", dest: "dist/css/"}
                ]/*,
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/<%= pkg.name /g,"_");
                    }
                }*/
            },
            vendor: {
                files: [
                    {expand: true, cwd: "components/bootstrap/dist", src: "**/*.min.*", dest: "dist/components/bootstrap/"},
                    {expand: true, cwd: "components/jquery/dist", src: "**/*.min.js", dest: "dist/components/jquery/"}
                ]
            }
        },
        clean: {
            dist: ["dist"]
        }
    });



}