/**
 * Created by yangli on 25/01/15.
 */
/*global require */

var gulp = require('gulp'),
    filter = require('gulp-filter'),
    del = require('del'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    template = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglify');

gulp.task('default',['clean','fa', 'chartcss', 'prismcss', 'js', 'jade', 'sass','server'], function(){
    'use strict';
    gulp.watch('dev/js/app/**/*.js', ['js']);
    gulp.watch('dev/index.jade', ['jade']);
    gulp.watch('dev/partials/*.jade', ['templates']);
    gulp.watch('dev/style/*.sass', ['sass']);
    gulp.watch('build/**/*',['reload']);
});

gulp.task('reload', function(){
    'use strict';
    return gulp.src('build/*')
        .pipe(connect.reload());
});

gulp.task('copy', function(){
   'use strict';
   return gulp.src('bower_components/**')
       .pipe(filter(['**/*.min.js', '**/firebase.js', '**/angular-chart.js', '**/*pack.js']))
       .pipe(gulp.dest('dev/js/library'));
});

gulp.task('clean', function(){
    'use strict';
    return del(['dev/js/library', 'build/*', 'bower_components/prismjs/plugins', 'bower_components/prismjs/components' ]);
});

gulp.task('js', ['copy', 'templates'], function(){
    'use strict';
    return gulp.src(['dev/js/library/**/*.js','dev/js/app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('templates', function(){
    'use strict';
    return gulp.src('dev/partials/**/*.jade')
        .pipe(jade())
        .pipe(template('templates.js',{module: 'app'}))
        .pipe(gulp.dest('dev/js/app'));
});

gulp.task('jade', function(){
    'use strict';
    return gulp.src('dev/index.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
    'use strict';
    return sass('dev/style/style.sass')
        .pipe(gulp.dest('build/'));
});

gulp.task('fa-css', ['clean'], function(){
    'use strict';
    return gulp.src('bower_components/font-awesome/css/*.min.css')
        .pipe(gulp.dest('build/fa/css'));
});

gulp.task('fa-fonts', ['clean', 'fa-css'], function(){
    'use strict';
    return gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('build/fa/fonts'));
});

gulp.task('chartcss', ['clean'], function(){
    'use strict';
    return gulp.src('bower_components/angular-chart.js/dist/angular-chart.css')
        .pipe(gulp.dest('build/chart/'));
});

gulp.task('prismcss', ['clean'], function(){
    'use strict';
    return gulp.src('bower_components/highlightjs/styles/default.css')
        .pipe(gulp.dest('build/highlight/'));
});

gulp.task('fa', ['clean', 'fa-fonts', 'fa-css']);



gulp.task('server', function () {
    'use strict';
    connect.server({
        root: 'build',
        port: 3001,
        livereload: true
    });
});


