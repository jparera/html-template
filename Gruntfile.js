module.exports = function(grunt) {
	var cfg = {
		watch: {
			options: {
				livereload: true
			},
			html: {	
				files: "dist/*.html"
			},
			js: {
				files: "dist/js/**/*.js"
			},
			css: {
				files: "dist/css/**/*.css"
			},
			jade: {
				files: ["src/*.jade"],
				tasks: ["jade"]
			},
			compass: {
				files: ["src/sass/**/*.scss", "src/sass/**/*.sass"],
				tasks: ["compass"]
			}
		},
		jade: {
			dist: {
				options: {
					data: grunt.file.readJSON('cfg/jade-data.json')
				},
				expand: true,
				cwd: "src",
				src: "*.jade",		
				dest: 'dist/',
				ext: ".html"
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: "src/sass",
					imagesDir: "src/img",
					cssDir: "dist/css",
					debugInfo: false
				}
			}
		}
	};

	grunt.initConfig(cfg);

	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");

	grunt.registerTask("default", ["jade", "compass"]);
	grunt.registerTask("live", ["default", "watch"]);
};
