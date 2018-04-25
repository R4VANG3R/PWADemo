const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

const files = {
    sass: {
        source: ['./assets/scss/**/*.scss'],
        dest: './build/css'
    },
    js: {
        source: ['./assets/**/*.js'],
        dest: './build/js'
    }
};

// Task for overall styles
gulp.task('styles', function () {
    gulp.src(files.sass.source)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: ['last 4 versions']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(files.sass.dest)
            .on('end', function () {
                // finished
                browserSync.reload();
            })
        );
});

// Task for scripts
gulp.task('scripts', () => {
    gulp.src(files.js.source)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(files.js.dest)
            .on('end', function () {
                // finished
                browserSync.reload();
            })
        );
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // Compile overall styles
    gulp.watch(files.sass.source, ['styles']);
    gulp.start('styles');

    // Compile scripts
    gulp.watch(files.js.source, ['scripts']);
    gulp.start('scripts');
});

// Build everything
gulp.task('default', function () {
    gulp.start('styles');
    gulp.start('scripts');
});
