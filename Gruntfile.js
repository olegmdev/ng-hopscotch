var pkg = require('./package.json');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies',
    config : './package.json'
  });

  grunt.initConfig({
    clean: {
      before:{
        src:['./dist']
      }
    },
    uglify: {
      main: {
        files : {
          './dist/ng-hopscotch.min.js' : './src/ng-hopscotch.js',
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'uglify'
  ]);
};
