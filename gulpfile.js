// 引入开发依赖包
const gulp = require('gulp');
const fileInclude = require('gulp-file-include'); //模块化HTML
const sass = require('gulp-sass')(require('sass')); //解析scss
const del = require('del'); //删除文件
const connect = require('gulp-connect'); //搭建临时服务器
const open = require('open'); //直接运行临时服务器


gulp.task('renderHtml', function () {
    return gulp.src(['src/**/*.html', '!src/components/**/*.html'])
        .pipe(fileInclude({
            indent: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
})

gulp.task('renderScss', function () {
    return gulp.src(['src/scss/*.scss', '!src/scss/public.scss'])
        .pipe(sass({
            // outputStyle: 'nested' //嵌套输出方式(默认)
            // outputStyle: 'expanded' //展开输出方式
            // outputStyle: 'compact' //紧凑输出方式
            outputStyle: 'compressed' //压缩输出方式
        }).on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
        .pipe(connect.reload());
})

gulp.task('renderStyle', function () {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
})

gulp.task('renderScript', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.parallel(['renderHtml']));
    gulp.watch('src/scss/*.scss', gulp.parallel(['renderScss']));
    gulp.watch('src/css/*.css', gulp.parallel(['renderStyle']));
    gulp.watch('src/js/*.js', gulp.parallel(['renderScript']));
})

gulp.task('delFile', function (done) {
    del(['dist/**/*.html', 'dist/css/*.css', 'dist/js/*.js'])
    done();
})

gulp.task('renderFile', gulp.parallel('renderHtml', gulp.series('renderScss', 'renderStyle'), 'renderScript'));

gulp.task('server', gulp.series('delFile', 'renderFile', function (done) {
    connect.server({
        root: 'dist/',
        port: '7777', //端口
        livereload: false, //实时刷新
        host: '::' //可在同一局域网内访问
    })
    open('http://192.168.1.168:7777');
    done();
}, 'watch'))