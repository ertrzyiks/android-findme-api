module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            src: [
                'index.js',
                'src/**/*.js',
                'spec/**/*.js',
                'features/**/*.js'
            ]
        },

        cucumberjs: {
            test: {
                src: 'features',
                options: {
                    steps: 'features',
                    tags: '~@wip'
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'test'
            }
        },

        jscs: {
            options: {
                config: ".jscsrc"
            },
            test: {
                files: {
                    src: '<%= meta.src %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            test: {
                files: {
                    src: '<%= meta.src %>'
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['spec/**/*.spec.js']

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-cucumber');
    grunt.loadNpmTasks('grunt-env');


    grunt.registerTask('test', ['env:test', 'jscs', 'jshint', 'mochaTest', 'cucumberjs']);
};
