'use strict';

var path = require('path');

module.exports = function (grunt) {

    require('load-grunt-config')(grunt);

    grunt.initConfig({
        express: {
            test: {
                options: {
                    port: 8080,
                    server: path.resolve('./server-config')
                }
            }
        },
        protractor: {
            e2e: {
                options: {
                    configFile: "tests/e2e/e2e-config.js",
                    keepAlive: false,
                    args: {
                        seleniumServerJar: "node_modules/grunt-protractor-runner/node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar"
                    }
                }
            }
        }
    });

    grunt.registerTask('test-e2e', ['express', 'protractor']);
    grunt.registerTask('default', ['test-e2e']);

};
