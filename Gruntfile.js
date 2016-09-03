var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'node_modules/bootstrap/dist',
            src: ['js/**', 'fonts/**' , 'css/**'], dest: 'public/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'node_modules/font-awesome/',
            src: ['fonts/**', 'css/**'], dest: 'public/vendor/font-awesome/'
          },
          {
            expand: true, cwd: 'node_modules/jquery/dist/',
            src: ['jquery.js'], dest: 'public/vendor/jquery/'
          },
          {
            expand: true, cwd: 'node_modules/metismenu/dist/',
            src: ['**'], dest: 'public/vendor/metismenu/'
          },
          {
            expand: true, cwd: 'node_modules/prismjs/',
            src: ['prism.js', 'themes/*'], dest: 'public/vendor/prismjs/'
          },
          {
            expand: true, cwd: 'node_modules/browserify-markdown-editor/',
            src: ['bundle.js', 'css/index.css','build.js','index.js', 'init.js', 'init-brace.js', 'main.js', 'render-md.js'], dest: 'public/vendor/editer/'
          }
        ]
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/prism.min.js': ['public/prism.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['copy:vendor' , 'uglify:my_target']);
};  