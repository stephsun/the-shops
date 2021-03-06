'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function(grunt) {
    var loadConfig = function(configPath) {
        var files = fs.readdirSync(configPath);
        return _.reduce(files, function(config, file) {
            var key = file.replace(/\.js$/, '');
            config[key] = require(configPath + key);
            return config;
        }, {});
    };

    var config = loadConfig('./grunt/configs/');
    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bunyan');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadTasks('./grunt/tasks');

    grunt.registerTask('default', [
        'env',
        'bunyan',
        'jshint', 
        'launch',
        'watch'
    ]);

    grunt.registerTask('heroku:production', [
        'env',
        'bunyan',
        'jshint', 
    ]);
};
