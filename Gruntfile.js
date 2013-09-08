module.exports = function(grunt) {
    var cfgDir = "cfg/",
        srcDir = "src/",
        outDir = "dist/",
        cfg = {
            watch: {
                options: {
                    livereload: true
                },
                html: {
                    files: outDir + "*.html"
                },
                js: {
                    files: outDir + "js/**/*.js"
                },
                css: {
                    files: outDir + "css/**/*.css"
                },
                dstImages: {
                    files: outDir + "img/**/*.{png,jpg,gif}"
                },
                srcImages: {
                    files: srcDir + "img/**/*.{png,jpg,gif}",
                    tasks: ["copy:img"],
                    options: {
                        livereload: false
                    }
                },
                jade: {
                    files: [
                        srcDir + "*.jade",
                        cfgDir + "jade*"
                    ],
                    tasks: ["jade"],
                    options: {
                        livereload: false
                    }
                },
                compass: {
                    files: [srcDir + "sass/**/*.{scss,sass}"],
                    tasks: ["copy:sass", "compass"],
                    options: {
                        livereload: false
                    }
                }
            },
            copy: {
                img: {
                    expand: true,
                    cwd: srcDir,
                    src: "img/**/*.{png,jpg,gif}",
                    dest: outDir
                },
                sass: {
                    expand: true,
                    cwd: srcDir,
                    src: "sass/**/*.{scss,sass}",
                    dest: outDir
                }
            },
            jade: {
                dist: {
                    options: {
                        data: grunt.file
                            .readJSON(cfgDir + "jade-data.json")
                    },
                    expand: true,
                    cwd: srcDir,
                    src: "*.jade",
                    dest: outDir,
                    ext: ".html"
                }
            },
            compass: {
                dist: {
                    options: {
                        cssDir: outDir + "css",
                        sassDir: outDir + "sass",
                        imagesDir: outDir + "img",
                        environment: "production"
                    }
                }
            },
            jshint: {
                src: {
                    options: {
                        jshintrc: srcDir + ".jshintrc"
                    },
                    src: [srcDir + "js/**/*.js"]
                },
                node: {
                    options: {
                        jshintrc: ".jshintrc"
                    },
                    src: ["*.js"]
                }
            }
        };

    grunt.initConfig(cfg);

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-compass");

    grunt.registerTask("default", ["lint", "compile"]);
    grunt.registerTask("lint", ["jshint"]);
    grunt.registerTask("compile", ["copy", "jade", "compass"]);
    grunt.registerTask("live", ["default", "watch"]);
};
