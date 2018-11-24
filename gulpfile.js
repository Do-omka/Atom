const
	gulp = require('gulp')
	,sourcemaps = require('gulp-sourcemaps')
	,postcss = require('gulp-postcss')
	,less = require('gulp-less')
	,imgmin = require('gulp-imagemin')
	,htmlmin = require('gulp-htmlmin')
	,jsmin = require('gulp-uglify')
	,pump = require('pump')
	,concat = require('gulp-concat')
	,del = require('del')
	,rigger = require('gulp-rigger')
	,babel = require('gulp-babel')

function minhtml () {
	return gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('docs'))
}

function mincss () {
	return gulp.src(['src/less/!(main.less)*', 'src/less/*'])
		.pipe(sourcemaps.init({
			loadMaps: true
			,largeFile: true
		}))
		.pipe(sourcemaps.identityMap())
		.pipe(postcss([
			require('postcss-svgo')
		]
		,{syntax: require('postcss-less')}
		))
		.pipe(concat('main.css'))
		.pipe(less())
		.pipe(postcss([
			require('autoprefixer')
			,require('postcss-csso')
			,require('postcss-focus')
		]))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('docs/css'))
}


function minjs (cb) {
	pump([
		gulp.src(['src/js/!(main.js)*.js', 'src/js/*.js'])
			.pipe(sourcemaps.init({
				loadMaps: true
				,largeFile: true
			}))
			.pipe(sourcemaps.identityMap())
			.pipe(concat('main.js'))
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(jsmin())
			.pipe(sourcemaps.write(''))
			.pipe(gulp.dest('docs/js'))
		,gulp.dest('docs/js')
	],
	cb
	)
}

function minimg () {
	del(['docs/imgs'])
	return gulp.src('src/img/*')
		.pipe(imgmin())
		.pipe(gulp.dest('docs/img'))
}

function watchhtml () {
	return gulp.watch(['src/*.html', 'src/templates/*.html'], minhtml)
}

function watchcss () {
	return gulp.watch('src/less/*.less', mincss)
}

function watchjs () {
	return gulp.watch('src/js/*.js', minjs)
}

gulp.task('default', gulp.series(minhtml, mincss, minjs, gulp.parallel(watchhtml, watchcss, watchjs)))
gulp.task(minimg)
