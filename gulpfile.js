/* eslint strict: [2, "global"] */
/* eslint-env node */
"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");
var Karma = require("karma").Server;

gulp.task("js:compile", ["js:lint"], function() {
    return gulp
        .src("src/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("js:compilie-ci", function() {
    return gulp
        .src("src/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("js:lint", function() {
    return gulp
        .src("src/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task("js:lint-ci", function() {
    return gulp
        .src("src/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("karma:ci", function(done) {
    new Karma({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done).start();
});

gulp.task("karma:tdd", function(done) {
    new Karma({
        configFile: __dirname + "/karma.conf.js"
    }, done).start();
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.js", ["js:compile"]);
});

gulp.task("test", ["js:lint-ci", "karma:ci"]);

gulp.task("default", ["karma:tdd", "watch"]);
