const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concat('rover.css'))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
    return gulp.src('./dev/scripts/rover.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./public/scripts'))
        .pipe(reload({ stream: true }));
});

gulp.task('watch', function () {
    gulp.watch('./dev/scripts/*.js', ['scripts']);
    gulp.watch('./dev/styles/*.scss', ['styles']);
    gulp.watch('./dev/styles/components/*.scss', ['styles']);
    gulp.watch('*.html', reload);
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: '.'
    })
});

//just run gulp in command to automate everything
gulp.task('default', ['browser-sync', 'styles', 'scripts', 'watch']);