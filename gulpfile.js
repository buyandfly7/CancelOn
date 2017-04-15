/**
 * Created by buyandfly on 10.04.17.
 */
'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  reload = browserSync.reload;
var clip = require('gulp-clip-empty-files');
var saveLicense = require('uglify-save-license');
var lessToScss = require('gulp-less-to-scss');
// var deleteEmpty = require('delete-empty');

var folders = {
  src: 'src/',
  dst: ''
};

var path = {
  build: {
    html: folders.dst,
    js_bootstrap: folders.dst + 'js/',
    js_ds_custom: folders.dst + 'js/',
    js_ds_plugins: folders.dst + 'js/',
    js_ds_scripts: folders.dst + 'js/',
    css: folders.dst + 'css/',
    css_template: folders.dst + 'css/',
    css_base_sizing: folders.dst + 'css/',
    css_custom: folders.dst + 'css/',
    css_ds_components: folders.dst + 'css/',
    css_bootstrap: folders.dst + 'css/',
    img: folders.dst + 'images/',
    fonts: folders.dst + 'assets/font/',
    less: folders.src + 'styles/'
  },
  src: {
    html: folders.src + '*.html',
    //js
    js_bootstrap: folders.src + 'js/bootstrap.js',
    js_ds_custom: folders.src + 'js/ds-custom.js',
    js_ds_plugins: folders.src + 'js/ds-plugins.js',
    js_ds_scripts: folders.src + 'js/**/*.js',
    //css
    css: folders.src + 'styles/**/*.scss',
    style_template: folders.src + 'styles/template.scss',
    style_base_sizing: folders.src + 'styles/base-sizing.scss',
    style_custom: folders.src + 'styles/custom.scss',
    style_ds_components: folders.src + 'styles/ds-components.scss',
    style_bootstrap: folders.src + 'styles/bootstrap.scss',
    less: folders.src + 'styles/**/*.less',
    img: [
      folders.src + 'images/**/*.*'
    ],
    fonts: folders.src + 'fonts/**/*.*'
  },
  watch: {
    html: folders.src + '**/*.html',
    scc: folders.src + 'styles/**/*.scss',
    js_bootstrap: folders.src + 'js/**/*.js',
    js_ds_custom: folders.src + 'js/**/*.js',
    js_ds_plugins: folders.src + 'js/**/*.js',
    js_ds_scripts: folders.src + 'js/**/*.js',
    style_template: folders.src + 'styles/**/*.scss',
    style_base_sizing: folders.src + 'styles/**/*.scss',
    style_custom: folders.src + 'styles/**/*.scss',
    style_ds_components: folders.src + 'styles/**/*.scss',
    style_bootstrap: folders.src + 'styles/**/*.scss',
    less: folders.src + 'styles/**/*.less',
    img: [
      folders.src + 'images/**/*.*'
    ],
    fonts: folders.src + 'fonts/**/*.*'
  }
};

gulp.task('lessToScss',function(){
  gulp.src(path.src.less)
    .pipe(lessToScss())
    .pipe(gulp.dest(path.build.less));
});

gulp.task('browser:sync', function() {
  browserSync.init({
    server: {
      baseDir: path.build.html
    }
  });

  gulp.watch(path.src.css).on("change", reload);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js_bootstrap)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_bootstrap))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_bootstrap));

  gulp.src(path.src.js_ds_custom)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_custom))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_ds_custom));

  gulp.src(path.src.js_ds_plugins)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_plugins))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_ds_plugins));

  gulp.src(path.src.js_ds_scripts)
    .pipe(clip())
    .pipe(gulp.dest(path.build.js_ds_scripts))
    .pipe(rigger())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest(path.build.js_ds_scripts));
});

gulp.task('styles:build', function () {
  gulp.src(path.src.style_template)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_template))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_template));

  gulp.src(path.src.style_base_sizing)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_base_sizing))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_base_sizing));

  gulp.src(path.src.style_custom)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_custom))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_custom));
  gulp.src(path.src.style_ds_components)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_ds_components))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_ds_components));
  gulp.src(path.src.style_bootstrap)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_bootstrap))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_bootstrap));
  gulp.src(path.src.css)
    .pipe(clip())
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['src/styles/'],
      outputStyle: 'expanded',
      // sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css_bootstrap))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css_bootstrap));

  //gulp.src(path.src.css).pipe(browserSync.stream());
});


gulp.task('images:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'styles:build',
  'fonts:build',
  'images:build',
  'browser:sync'
]);

gulp.task('watch', function () {
  gulp.watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  //css
  gulp.watch([path.watch.style_template], function (event, cb) {
    gulp.start('styles:build');
  });
  gulp.watch([path.watch.style_base_sizing], function (event, cb) {
    gulp.start('styles:build');
  });
  gulp.watch([path.watch.style_custom], function (event, cb) {
    gulp.start('styles:build');
  });
  gulp.watch([path.watch.style_ds_components], function (event, cb) {
    gulp.start('styles:build');
  });
  gulp.watch([path.watch.style_bootstrap], function (event, cb) {
    gulp.start('styles:build');
  });
  //js
  gulp.watch([path.watch.js_bootstrap], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_custom], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_plugins], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.js_ds_scripts], function (event, cb) {
    gulp.start('js:build');
  });
  gulp.watch([path.watch.img], function (event, cb) {
    gulp.start('images:build');
  });
  gulp.watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
});


gulp.task('default', ['build', 'watch', 'browser:sync']);