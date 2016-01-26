var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    jasmine = require('gulp-jasmine'),
    bsync = require('browser-sync');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css', 'ts', 'test']);

// run development task
gulp.task('dev', ['watch', 'test' , 'serve']);

/* serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
}); */

gulp.task('serve', (done) => {
  bsync({
    server: {
      baseDir: ['build']
    }
  })
  done();  
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/ts/**/*.ts', ['ts']);
  gulp.watch('build/**/*', bsync.reload);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// compile the typescript code
gulp.task('ts', function(){
  var tsProject = typescript.createProject('tsconfig.json');
  var tsResult = tsProject.src(['src/ts/**/*.ts']) // instead of gulp.src(...)
    .pipe(typescript(tsProject));
  return tsResult.js.pipe(gulp.dest('src/'));
        
  //return gulp.src(['src/ts/**/*.ts'])
  //  .pipe(typescript())
  //  .pipe(gulp.dest('src/'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});

// run the tests
gulp.task('test', function() {
   return gulp.src('spec/src/*.js')
      .pipe(jasmine());
});
