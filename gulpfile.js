const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const glob = require('glob')
const es = require('event-stream')

const browserify = require('browserify')
const babelify = require('babelify')

// source file configuration
const files = {
  sass: {
    source: ['./assets/scss/**/*.scss'],
    dest: './build/css'
  },
  js: {
    src: ['./assets/js/**/*.js'],
    bundles: [
      './assets/js/bundles/**/*.js',
    ],
    dest: './build/js',
    output: [
      './build/js/**/*.bundle.js',
      './build/js/**/*.bundle.js.map',
    ],

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
    .pipe(gulp.dest(files.sass.dest))
    .pipe(browserSync.reload({stream: true}))
});

// Task for scripts
gulp.task('scripts', (done) => {
  let bundleTasks = files.js.bundles.map(bundleFile => {
    let fileSrc = glob.sync(bundleFile)

    const tasks = fileSrc.map(file => {
      return browserify({
        entries: file,
        debug: true,
      })
        .transform(babelify)
        .bundle()
        .pipe(source(file))
        .pipe(buffer())
        .pipe(rename({
          // strip source file folder structure
          dirname: '',
          suffix: '.bundle',
          extname: '.js',
        }))
        .pipe(sourcemaps.init({
          loadMaps: true,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(files.js.dest))
        .pipe(browserSync.reload({stream: true}))
    })

    return es.merge.apply(null, tasks)
  })

  es.merge.apply(null, bundleTasks)
    .on('end', done);
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
  gulp.watch(files.js.src, ['scripts']);
  gulp.start('scripts');
});

// Build everything
gulp.task('default', function () {
  gulp.start('styles');
  gulp.start('scripts');
});
