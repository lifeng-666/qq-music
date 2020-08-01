const {src, dest, watch, series} = require('gulp');
const htmlClean = require('gulp-htmlclean');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');
const imgMin = require('gulp-imagemin');
const connect = require('gulp-connect');
const folder = {
    src: 'src/',
    dist: 'dist/'
}

function html () {
    console.log(imgMin)
    return src(folder.src + 'html/*')
           .pipe(htmlClean())
           .pipe(dest(folder.dist + 'html/'))
           .pipe(connect.reload());
}
function js () {
    return src(folder.src + 'js/*')
           .pipe(uglify())
           .pipe(dest(folder.dist + 'js/'))
           .pipe(connect.reload());
}
function css () {
    return src(folder.src + 'css/*')
           .pipe(less())
           .pipe(cssClean())
           .pipe(dest(folder.dist + 'css/'))
           .pipe(connect.reload());
}
function images () {
    return src(folder.src + 'images/*')
           .pipe(imgMin())
           .pipe(dest(folder.dist + 'images/'))
}

function server (cb) {
    connect.server({
        port: '1998',
        livereload: true
    })
    cb();
}

watch(folder.src + 'html/*', function (cb) {
    html();
    cb();
})
watch(folder.src + 'css/*', function (cb) {
    css();
    cb();
})
watch(folder.src + 'js/*', function (cb) {
    js();
    cb();
})
exports.default = series(html, js, css, images, server);