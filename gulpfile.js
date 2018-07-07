var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var cp           = require('child_process');
var babel        = require('gulp-babel');
var stylelint    = require('gulp-stylelint');
var eslint       = require('gulp-eslint');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var clean        = require('gulp-clean-css');
var imagemin     = require('gulp-imagemin');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-build:prod', function (done) {
  return cp.spawn(jekyll, [
    'build',
    '-ddeploy'
  ], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('lint-css', function () {
  return gulp.src('source/stylesheets/**/*.scss')
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

gulp.task('sass', ['lint-css'], function () {
  return gulp.src('source/stylesheets/main.scss')
    .pipe(sass({
      onError: browserSync.notify
    }))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('source/stylesheets'));
});

gulp.task('sass:prod', ['lint-css'], function () {
  return gulp.src('source/stylesheets/main.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(clean())
    .pipe(gulp.dest('deploy/stylesheets'));
});

gulp.task('lint-js',function () {
  return gulp.src('source/javascripts/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', ['lint-js'], function () {
  gulp.src('source/javascripts/main.js')
    .pipe(browserify())
    .pipe(babel())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js:prod', ['lint-js'], function () {
  gulp.src('source/javascripts/main.js')
    .pipe(browserify())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('deploy/javascripts'));
});

gulp.task('images:prod', function () {
  gulp.src('source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('deploy/images'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('source/stylesheets/**/*.scss', ['sass']);
  gulp.watch('source/javascripts/**/*.js', ['js']);
  gulp.watch(['source/layouts/*.html', 'source/includes/*.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll public, launch BrowserSync & watch files.
 */

gulp.task('deploy', ['sass:prod', 'js:prod', 'jekyll-build:prod', 'images:prod']);

gulp.task('default', ['browser-sync', 'watch']);
