var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
    var tsProject = ts.createProject('tsconfig.json');

    gulp.src([
        "control/*.ts",
        "core/*.ts",
        "model/*.ts",
        "utils/*.ts",
        ]).pipe(tsProject())
        .pipe(gulp.dest("dist"))
        .pipe(uglify({ mangle: false }))
        .pipe(rename("tinyts.min.js"))
        .pipe(gulp.dest("dist"));
});

gulp.start();