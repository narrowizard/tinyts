var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var order = require("gulp-order");

var scriptsPath = 'src/';

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('default', function () {

    var folder = "core";
    //  core
    gulp.src(path.join(folder, '/*.js'))
        .pipe(order([
            "ViewFilter.js",
            "View.js",
            "VirtualView.js",
            "TextView.js",
            "ListView.js",
            "BaseViewModel.js",
            "ViewGroup.js",
            "ServicePool.js"
        ]))
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest(scriptsPath))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(scriptsPath));
    //  control
    gulp.src(path.join("controls", "/*.js"))
        .pipe(order([
            "album.js",
            "button.js",
            "textBox.js",
            "datetimePicker.js",
            "editDialog.js",
            "fileUploader.js",
            "imageView.js",
            "itemlist.js",
            "jsonList.js",
            "radioButton.js",
            "scrollPageView.js",
            "selectButton.js",
            "tableView.js",
            "ueditor.js"
        ]))
        .pipe(concat("controls.js"))
        .pipe(gulp.dest(scriptsPath))
        .pipe(uglify())
        .pipe(rename("controls.min.js"))
        .pipe(gulp.dest(scriptsPath));
    //  models
    gulp.src("models/*.js")
        .pipe(concat("models.js"))
        .pipe(gulp.dest(scriptsPath))
        .pipe(uglify())
        .pipe(rename("models.min.js"))
        .pipe(gulp.dest(scriptsPath));
        
    //    var folders = getFolders(scriptsPath);

    //    var tasks = folders.map(function(folder) {
    //       // 拼接成 foldername.js
    //       // 写入输出
    //       // 压缩
    //       // 重命名为 folder.min.js
    //       // 再一次写入输出
    //       return gulp.src(path.join(scriptsPath, folder, '/*.js'))
    //         .pipe(order([
            
    //         ]))
    //         .pipe(concat(folder + '.js'))
    //         .pipe(gulp.dest(scriptsPath))
    //         .pipe(uglify())
    //         .pipe(rename(folder + '.min.js'))
    //         .pipe(gulp.dest(scriptsPath));
    //    });

    //    return merge(tasks);
});