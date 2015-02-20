module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			def: {
				src: 'src/gm.datepickerMultiSelect.js',
				dest: 'dist/gm.datepickerMultiSelect.min.js'
			}
		},
		
		watch: {
			files: ['src/**'],
			tasks: ['uglify']
		}
	});
	
	//grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
};