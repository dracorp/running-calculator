module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['install']);
    grunt.registerTask('install', ['uglify', 'cssmin', 'copy']);
    grunt.registerTask('clean:install',['clean','install']);

    // inicjalizacja konfiguracji zadań
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        distdir: "dist",
        srcdir: "src/dev",
        resources: "resources",

        uglify  : {
            dev : {
                expand  : true,
                cwd     : '<%= srcdir %>/<%= resources %>/js/',
                src     : ['**/*.js', '!**/*.min.js'],
                dest    : '<%= srcdir %>/<%= resources %>/js/min/',
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
                    cwd: '<%= srcdir %>/<%= resources %>/css/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= srcdir %>/<%= resources %>/css/min',
                    ext: '.min.css'
                }]
            }
        },
        watch : {
            js : {
                files : '<%= srcdir %>/<%= resources %>/js/*.js',
                tasks   : ['uglify','copy:dist']
            },
            css : {
                files : '<%= srcdir %>/<%= resources %>/css/*.css',
                tasks : ['cssmin','copy:dist']
            },
            html: {
                files: '<%= srcdir %>/html/*.html',
                tasks: ['copy:dist']
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: "<%= srcdir %>/html/", src: "*.html", dest: "<%= distdir %>/p/"},
                    {expand: true, cwd: "<%= srcdir %>/<%= resources %>/js/min", src: "*", dest: "<%= distdir %>/<%= resources %>/js/"},
                    {expand: true, cwd: "<%= srcdir %>/<%= resources %>/css/min", src: "*", dest: "<%= distdir %>/<%= resources %>/css/"}
                ],
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/\/src\/dev/g,"").replace(/\.js/g,".min.js").replace(/\.css/g,".min.css");
                    }
                }
            },
            vendor: {
                files: [
                    {expand: true, cwd: "vendors/bootstrap/dist", src: "**/*.min.*", dest: "<%= distdir %>/vendors/bootstrap/dist"},
                    {expand: true, cwd: "vendors/jquery/dist", src: "**/*.min.js", dest: "<%= distdir %>/vendors/jquery/dist"}
                ]
            }
        },
        clean: {
            dist: ["dist"]
        }
    });



}