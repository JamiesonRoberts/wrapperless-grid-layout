
module.exports = function (gulp, plugins, config) {
 	var deferred = plugins.Q.defer();
 	
	gulp.src(config.source.scripts + '/legacy.js').pipe(gulp.dest(config.ap + '/js'));
    
 	var b = plugins.browserify(plugins.watchify.args)
		.add('./'+config.source.scripts + '/app.js')
		.transform(plugins.debowerify)
		.bundle()
		.pipe(plugins.source('app.js'))
		.pipe(plugins.streamify(plugins.uglify()))
		.pipe(gulp.dest(config.ap + '/js'))
		.on('end', function () {
			//gulp.src(config.ap + '/js/app.js').pipe(plugins.jshint('.jshintrc')).pipe(plugins.jshint.reporter('jshint-stylish'));
		 	plugins.notifier.notify({title: 'Task Complete', message: 'Scripts task complete!'});
         	deferred.resolve();
     });
    return deferred.promise;
};

