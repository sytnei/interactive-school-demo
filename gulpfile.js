/*global require*/
"use strict";

const gulp = require("gulp"),
    path = require("path"),
    plumber = require('gulp-plumber'),
    data = require("gulp-data"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    prefix = require("gulp-autoprefixer"),
    cssmin = require('gulp-cssnano'),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    mergeJson = require("merge-json"),
    clean = require("gulp-clean"),
    imagemin = require('gulp-imagemin'),
    runSequence = require("run-sequence");

/*
 * Directories here
 */
const paths = {
    scss: "./sources/scss/",
    srcJs: "./sources/js/",
    srcImg: "./sources/img/",
    srcFonts: "./sources/fonts/",
    css: "./assets/css/",
    js: "./assets/js/",
    img: "./assets/img/",
    fonts: "./assets/fonts/",
    nodeModules: "./node_modules/"
};

/**
 * Wait scss tasks, then launch the browser-sync Server
 */
gulp.task("browser-sync", ["scss"], () => {
    var files = [
        paths.scss + '/*',
        paths.srcJs + '/*'
    ];
    browserSync.init(files, {
        open: true,
        server: false,
        proxy: {
            target: "http://localhost/interactive-school-demo"
        }
    });
});


gulp.task("browser-refresh", () => {
    browserSync.reload("*.html");
});



/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task("scss", () => {
    return gulp.src(paths.scss + "**/*.scss")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        })).pipe(sass({
            includePaths: [paths.scss]
        }))

    .pipe(prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
            cascade: true
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Copy new fonts to assets 
 */

gulp.task('fonts', function() {
    gulp.src(paths.srcFonts + '**/*')
        .pipe(gulp.dest(paths.fonts));
});


/**
 * Copy new images to assets
 */

gulp.task('images', function() {
    gulp.src(paths.srcImg + '**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.img));
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */

gulp.task("watch", () => {
    gulp.watch(paths.scss + "**/*.scss", ["scss"]);
    gulp.watch(paths.srcJs + "/*.js", ["scripts"]);
    gulp.watch("./*.html", ["browser-refresh"]);
});


/**
 * Move js files
 */
gulp.task("scripts", () => {

    return gulp.src([
            paths.nodeModules + "/jquery/dist/jquery.min.js",
            paths.srcJs + "scripts.js"
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Build task compile scss and scripts
gulp.task("build", (callback) => {
    runSequence(
        "scripts",
        "scss",
        callback
    );
});

/**
 * Default task, running just `gulp` will compile the scss, launch BrowserSync then watch files for changes
 */
gulp.task("default", (callback) => {
    runSequence(
        "scss",
        "fonts",
        "images",
        "scripts",
        "browser-sync",
        "watch"
    )
});