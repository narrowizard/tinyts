var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');

gulp.task('compile', function () {
    var tsProject = ts.createProject('tsconfig1.json');
    // compile to single file.
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

    // compile to files
    gulp.src([
        "**/*.ts",
        "!application/*.ts"
    ]).pipe(ts({
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        moduleResolution: "classic",
        target: "es5",
        module: "commonjs"
    })).pipe(gulp.dest("dist"));

});

gulp.task('test', ['compile'], function () {
    // test code
    gulp.src("dist/test/**/*.js", { read: false })
        .pipe(mocha({
            reporter: "nyan",
            require: "jsdom-global/register"
        }))
});

gulp.task('default', ['test']);