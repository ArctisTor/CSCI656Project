// Generated on 2014-09-23 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        server: 'server',
        dist: 'dist',
        appDist: 'dist/public',
        serverDist: 'dist/server'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        paths: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= paths.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            sass: {
                files: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:dist', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= paths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8100,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ],
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        var serveStatic = require('serve-static');
                        return [
                            serveStatic('.tmp'),
                            serveStatic(appConfig.app),
                            require('grunt-connect-proxy/lib/utils').proxyRequest
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        var serveStatic = require('serve-static');
                        return [
                            serveStatic('.tmp'),
                            serveStatic(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= paths.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= paths.dist %>/{,*/}*',
                        '!<%= paths.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                src: '<%= paths.app %>/styles/main.scss',
                dest: '.tmp/styles/main.css'
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= paths.appDist %>/scripts/{,*/}*.js',
                    '<%= paths.appDist %>/styles/{,*/}*.css',
                    '<%= paths.appDist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= paths.app %>/index.html',
            options: {
                dest: '<%= paths.appDist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= paths.appDist %>/{,*/}*.html'],
            css: ['<%= paths.appDist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= paths.appDist %>','<%= paths.appDist %>/images']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.appDist %>',
                    src: ['*.html', 'views/{,*/}*.html', '/templates/{,*}*.html'],
                    dest: '<%= paths.appDist %>'
                }]
            }
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.appDist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'templates/{,*/}*.html',
                        'images/{,*/}*.{png,jpg,jpeg,gif}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= paths.appDist %>/images',
                    src: ['generated/*']
                }, {
                    // Font Awesome
                    expand: true,
                    cwd: '<%= paths.app %>/node_modules/font-awesome/fonts',
                    dest: '<%= paths.appDist %>/fonts',
                    src: ['*.{otf,eot,svg,ttg,woff,woff2}']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= paths.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            server: {
                files: [{
                    // Server script files
                    expand: true,
                    cwd: '<%= paths.server %>',
                    dest: '<%= paths.serverDist %>',
                    src: [
                        '**',
                        '!**/*.log',
                        '!node_modules/**',
                        '!security/keys/*',
                        '!logs/*'
                    ]
                }]
            },
            serverdeps: {
                files: [{
                    // Node Server dependencies
                    // Copy only necessary files
                    expand: true,
                    cwd: '<%= paths.server %>/node_modules',
                    dest: '<%= paths.serverDist %>/node_modules',
                    src: [
                        '**/*.js',
                        '**/*.json',
                        '!**/example/**',
                        '!**/examples/**',
                        '!**/Gruntfile.js'
                    ]
                }]
            }
        },

        auto_install: {
            subdir: {
                local: {},
                options: {
                    cwd: '.',
                    recursive: true,
                    npm: '--no-shrinkwrap --no-optional',
                    exclude: ['.git', 'node_modules', 'dist']
                }
            }
        },

        // Run some tasks in parallel to speed up the build process
        // concurrent: {
        //     server: [
        //         'sass:dist'
        //     ],
        //     dist: [
        //         'sass:dist'
        //     ]
        // }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'sass:dist',
            'autoprefixer',
            'configureProxies:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build', function (target) {
        if (target === 'lowsec') {
            grunt.log.writeln('Running lowsec build with reduced capabilities.');

            grunt.task.run([
                'clean:dist',

                // server
                'copy:server',
                'auto_install',
                'copy:serverdeps',

                // app
                'useminPrepare',
                // 'concurrent:dist',
                'autoprefixer',
                // 'concat',
                'ngAnnotate',
                'copy:dist',
                'copy:dist',
                'cssmin',
                // 'uglify',
                'filerev',
                'usemin',
                'htmlmin'
            ]);
        } else {
            grunt.task.run([
                'clean:dist',

                // server
                'copy:server',
                'auto_install',
                'copy:serverdeps',

                // app
                'useminPrepare',
                // 'concurrent:dist',
                'autoprefixer',
                // 'concat',
                'ngAnnotate',
                'copy:dist',
                'cssmin',
                // 'uglify',
                'filerev',
                'usemin',
                'htmlmin'
            ]);
        }
    });

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.loadNpmTasks('grunt-contrib-concat');
};