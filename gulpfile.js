
const gulp = require('gulp');

const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');

const browserSyncServer = require('browser-sync').create();

function javascript(ended) {

    gulp.src("./src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSyncServer.stream());

    ended();
}

function styles(ended) {

    gulp.src("./src/sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie >= 10'] })
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSyncServer.stream());

    ended();
}

function watch(ended) {

    gulp.watch('./src/js/*.js', javascript);
    gulp.watch('./src/sass/*.scss', styles);

    ended();
}

function browserSync(ended) {

    browserSyncServer.init({
        server: {
            baseDir: "./"
        }
    });

    ended();
}

function compress(ended) {
    
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
    
    ended();
}

// gulp.series
// gulp.parallel

const watchFiles = gulp.parallel(browserSync, gulp.series(javascript, styles, watch));
const compressImages = gulp.series(compress);

exports.default = watchFiles;
exports.compress = compressImages;