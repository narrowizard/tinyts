var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');

gulp.task('product', function () {
    var tsProject = ts.createProject('tsconfig1.json');
    // compile to single file.
    gulp.src([
        "control/*.ts",
        "core/*.ts",
        "model/*.ts",
        "utils/*.ts",
    ]).pipe(tsProject(ts.reporter.nullReporter()))
        .pipe(gulp.dest("build"))
        .pipe(uglify({ mangle: false }))
        .pipe(rename("tinyts.min.js"))
        .pipe(gulp.dest("build"));
});

gulp.task('test_compile', function () {
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
    }, ts.reporter.nullReporter())).pipe(gulp.dest("dist"));
});

gulp.task('clean', function () {
    gulp.src('dist', { read: false })
        .pipe(clean());
})

gulp.task('default', ['clean'], function () {
    gulp.start("test_compile");
    gulp.start("product");
});
