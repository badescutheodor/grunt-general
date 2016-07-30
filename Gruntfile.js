/**
 * ////////////////////////////////////////////////////
 * Grunt build config file created for [general] use
 * ////////////////////////////////////////////////////
 *
 * @creator Badescu Theodor
 * @time    11/2/2016
 *
 *
 * > License:
 *
 * This file is copyrighted. You are not allowed to use
 * the content of this file without written and signed
 * paper from the creator of this file.
 *
 * ----------------------------------------------------
 *
 * > Documentation:
 *
 * >> Folder structure:
 *
 *  project/
 *          src
 *              assets
 *                  scss
 *                      modules
 *                      app.scss
 *                  coffee
 *                  lib
 *                      js
 *                      css
 *                  img
 *                  views
 *                  fonts
 *              app.html
 *
 *          build -- output folder
 *              assets
 *                  css
 *                      app.min.css
 *                  js
 *                  img
 *                  views
 *                  fonts
 *              index.html
 *
 *
 * >> Tasks:
 *
 * >>> grunt watchFiles
 *     watches the files and on change rebuild the needed module
 *
 * >>> grunt images
 *     manualy optimizes images
 *
 * >>> grunt scripts
 *     manualy rebuilds scripts module
 *
 * >>> grunt styles
 *     manualy rebuilds styles module
 *
 * -----------------------------------------------------
 */

/**
 * The actual configuration object
 */
var GRUNT_CONFIG = function(GRUNT) {

    /**
     *  Load all the modules required
     *  for the tasks inside grunt
     */ require('load-grunt-tasks')(GRUNT);

    /**
     *  The configuration object for each module
     */ GRUNT.initConfig({

        /**
         * Banner template used for built js and css files
         */
        banner: '/* @created_at <%= grunt.template.today("dd-mm-yyyy") %> */',

        // @delete
        clean: {
            /**
             * Used to remove the build folder on each grunt build run command
             */
            buildFolder: {
                src: ["build"]
            },

            /**
             * Remove the leftovers from the build css folder after minification
             */
            buildCssFolder: {
                src: ["build/assets/css/*.css", "!build/assets/css/app.min.css"]
            },

            /**
             * Remove the leftovers from the build js folder after minification
             */
            buildJsFolder: {
                src: ["build/assets/js/*", "build/assets/js/*.js", "!build/assets/js/app.min.js"]
            },

            /**
             * Removes the app min generated file so the new content does not get appended
             */
            buildJsFile: {
                src: ["build/assets/js/app.min.js"]
            },

            /**
             * Removes the app min generated file so the new content does not get appended
             */
            buildCssFile: {
                src: ["build/assets/css/app.min.css"]
            },

            /**
             * Removes the images from the build folder
             */
            buildImgFolder: {
                src: ["build/assets/img"]
            }
        },

        // @create
        mkdir: {
            /**
             * Used to create the build folder structure on each grunt build run command
             */
            buildFolder: {
                options: {
                    create: ["build", "build/assets", "build/assets/js", "build/assets/css", "build/assets/img", "build/assets/views", "build/assets/fonts"]
                }
            }
        },

        // @create
        sass: {
            options: {
                sourceMap: false
            },

            /**
             * Used to minify, concatenate and convert scss into native css and place it
             * into app.min.css into the build assets folder
             */
            build: {
                files: {
                    'build/assets/css/app.css': 'src/assets/scss/app.scss'
                }
            }
        },

        // @update
        autoprefixer: {
            /**
             * Used to autoprefix css tags inside build's app css file
             */
            build: {
                files: {
                    'build/assets/css/app.css': 'build/assets/css/app.css'
                }
            }
        },

        // @minify
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },

            /**
             * Minify the app.css by removing whitespace
             */
            build: {
                files: {
                    'build/assets/css/app.min.css': ['build/assets/css/*.css', '!build/assets/css/app.css', 'build/assets/css/app.css']
                }
            }
        },

        // @copy
        copy: {
            /**
             * Copies the css files from src/assets/lib/css/* into build/assets/css for
             * minifying and merging
             */
            buildCssLibFolder: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/libs/css/',
                    src: '**',
                    dest: 'build/assets/css/'
                }]
            },

            /**
             * Copies the app.html file into the build folder
             */
            buildEntryPoint: {
                src: 'src/app.html',
                dest: 'build/index.html'
            },

            /**
             * Copies the js files from src/assets/lib/js/* into build/assets/js for minifying
             * and merging
             */
            buildJsLibFolder: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/libs/js/',
                    src: '**',
                    dest: 'build/assets/js/'
                }]
            },

            /**
             * Copies all the fonts from src/assets/fonts/* into build/assets/fonts
             */
            buildFontsFolder: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/fonts/',
                    src: '**',
                    dest: 'build/assets/fonts/'
                }]
            },

            /**
             * Copies all the images from src/assets/img/* into build/assets/img
             */
            buildImgFolder: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: '**',
                    dest: 'build/assets/img/'
                }]
            }
        },

        // @minify
        imagemin: {
            /**
             * Optimizes the images within the src folder and place them in same folder structure
             * into build/assets/img
             */
            build: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: '**/*.*',
                    dest: 'build/assets/img/'
                }]
            }
        },

        // @minify
        htmlmin: {
            /**
             * Minifies the app views htmls into to build folder
             */
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'build/assets/views/',
                    src: '**/*.*',
                    dest: 'build/assets/views/'
                }]
            }
        },

        // @minify
        purifycss: {
            /**
             * Removes the unused css from the views folder
             */
            options: {
                minify: true
            },
            target: {
                src: ['build/assets/views/*.html', 'build/index.html'],
                css: ['build/assets/css/app.min.css'],
                dest: 'build/assets/css/app.min.css'
            }
        },

        // @create
        coffee: {
            /**
             * Builds the coffee files and places a concatenated version
             * into build folder
             */
            build: {
                options: {
                    join: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/assets/coffee/',
                    src: '**/*.coffee',
                    dest: 'build/assets/js/',
                    ext: '.coffee.js'
                }]
            }
        },

        // @create
        jade: {
            /**
             * Builds the jades files and places the html inside build folder
             */
            build: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/assets/views',
                    src: '**/*.jade',
                    dest: 'build/assets/views/',
                    ext: '.html'
                }]
            }
        },

        // @minify
        uglify: {
            options: {
                mangle: false
            },
            /**
             * Minifies the javascript build files
             */
            build: {
                files: {
                    'build/assets/js/app.min.js': ['build/assets/js/**/*.js', 'build/assets/js/**/*.coffee.js']
                }
            }
        },

        // @update
        usebanner: {
            /**
             * Place a banner on top of css and js built files to show build date and
             * copyright information
             */
            build: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [ 'build/assets/css/app.min.css', 'build/assets/js/app.min.js' ]
                }
            }
        },

        // @watch
        watch: {
            /**
             * Watches scss files for changes and if a change is detected
             * remake the css build folder
             */
            styles: {
                files: ['src/assets/scss/**/*.scss'],
                tasks: [ 'clean:buildCssFile',
                         'sass:build',
                         'autoprefixer:build',
                         'copy:buildCssLibFolder',
                         'cssmin:build',
                         'clean:buildCssFolder' ]
            },

            /**
             * Watches coffee files for changes and if a change has occured remake
             * the js build folder
             */
            scripts: {
                files: ['src/assets/coffee/**/*.coffee'],
                tasks: [ 'clean:buildJsFile',
                         'coffee:build',
                         'copy:buildJsLibFolder',
                         'uglify:build',
                         'clean:buildJsFolder' ]
            },

            /**
             * Watches the html view files and minifies them on change
             */
            views: {
                files: ['src/assets/views/**/*.jade'],
                tasks: [ 'jade:build, htmlmin:build' ]
            },

            /**
             * Watches the images and generates optimized ones on updates
             */
            img: {
                files: ['src/assets/img/**/*.*'],
                tasks: [ 'clean:buildImgFolder', 'copy:buildImgFolder', 'imagemin:build' ]
            },

            /**
             * Watches app.html entry file and transforms it into the index
             * on change
             */
            entryPoint: {
                files: ['src/app.html'],
                tasks: [ 'copy:buildEntryPoint' ]
            },

            /**
             * Watches fonts assets for changes and copies them into the build folder
             * when needed
             */
            fonts: {
                files: ['src/assets/fonts/**/*.*'],
                tasks: ['copy:buildFontsFolder']
            }

        },

        // @watch
        concurrent: {
            dev: {
                tasks: ['watch:styles', 'watch:scripts', 'watch:views', 'watch:img', 'watch:entryPoint'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    /**
     *  Grunt default task that runs onto grunt command
     */ GRUNT.registerTask('default', []);

    /**
     *  Grunt watch task that checks for scss / coffee and rebuilds
     *  the needed module
     */ GRUNT.registerTask('watchFiles', ['concurrent:dev']);


    /**
     *  Grunt watch task that checks for scss / coffee and rebuilds
     *  the needed module
     */ GRUNT.registerTask('images',  ['clean:buildImgFolder', 'copy:buildImgFolder', 'imagemin:build']);
        GRUNT.registerTask('styles',  ['clean:buildCssFile', 'sass:build', 'autoprefixer:build', 'copy:buildCssLibFolder', 'purifycss', 'cssmin:build', 'clean:buildCssFolder']);
        GRUNT.registerTask('scripts', ['clean:buildJsFile', 'coffee:build', 'copy:buildJsLibFolder', 'uglify:build', 'clean:buildJsFolder']);
        GRUNT.registerTask('entry',   ['copy:buildEntryPoint']);
        GRUNT.registerTask('fonts',   ['copy:buildFontsFolder']);


    /**
     * Grunt build task that runs onto grunt build command
     */ GRUNT.registerTask('build', [ 'clean:buildFolder',
        'mkdir:buildFolder',
        // assets/css
        'sass:build',
        'autoprefixer:build',
        'copy:buildCssLibFolder',
        'cssmin:build',
        'clean:buildCssFolder',
        // assets/img
        'clean:buildImgFolder',
        'copy:buildImgFolder',
        'imagemin:build',
        // assets/views
        'jade:build',
        'htmlmin:build',
        'purifycss',
        // assets/js
        'coffee:build',
        'copy:buildJsLibFolder',
        'uglify:build',
        'clean:buildJsFolder',
        // assets/fonts
        'copy:buildFontsFolder',
        // app.html
        'copy:buildEntryPoint',
        // misc
        'usebanner:build' ]);
};

/**
 *  Export the config into node
 */ module.exports = GRUNT_CONFIG;
