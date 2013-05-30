module.exports = function(grunt) {

	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			dev: {
				files: [
					{expand: true, cwd: './assets', src: ['js/**'], dest: '.tmp/public'},
					// {expand: true, cwd: './assets', src: ['templates/**'], dest: '.tmp/public'},
					{expand: true, cwd: './assets', src: ['index.html'], dest: '.tmp/public'}
				]
			}
		},

		clean: {
			dev: ['.tmp/public/**']
		},

		jst: {
			dev: {
				options: {
					templateSettings: {
						interpolate : /\{\{(.+?)\}\}/g
					}
				},
				files: {
					'.tmp/public/templates/templates.js': ['assets/templates/**/*.html']
				}
			}
		},

		less: {
			dev: {
				files: [
					{
						expand: true,
						cwd: 'assets/styles/',
						src: ['**/*.less','!importer.less'],
						dest: '.tmp/public/styles/',
						ext: '.css'
					}
				]
			}
		},

		scriptlinker: {
			devJs: {
				options: {
					startTag: '<!--SCRIPTS-->',
					endTag: '<!--SCRIPTS END-->',
					fileTmpl: '\n<script src="%s"></script>\n',
					appRoot: '.tmp/public/'
				},
				files: {
					'.tmp/public/index.html': ['.tmp/public/js/jquery.js', '.tmp/public/js/foobar.js', '.tmp/public/js/**/*.js']
				}
			},
			devStyles: {
				options: {
					startTag: '<!--STYLES-->',
					endTag: '<!--STYLES END-->',
					fileTmpl: '\n<link rel="stylesheet" href="%s">\n',
					appRoot: '.tmp/public/'
				},
				files: {
					'.tmp/public/index.html': ['.tmp/public/styles/**/*.css']
				}
			},
			devTpl: {
				options: {
					startTag: '<!--TEMPLATES-->',
					endTag: '<!--TEMPLATES END-->',
					fileTmpl: '\n<script src="%s"></script>\n',
					appRoot: '.tmp/public/'
				},
				files: {
					'.tmp/public/index.html': ['.tmp/public/templates/**/*']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-scriptlinker');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['clean:dev', 'jst:dev', 'less:dev', 'copy:dev', 'scriptlinker:devJs', 'scriptlinker:devStyles', 'scriptlinker:devTpl']);
};
