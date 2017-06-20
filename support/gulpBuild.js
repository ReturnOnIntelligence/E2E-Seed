const gulp = require('gulp');
const ts = require('gulp-tsc');
const tslint = require('gulp-tslint');
const tsconfig = require('../tsconfig');
const settings = require('./settings')

const paths = settings.paths;

gulp.task('build-ts', ['clean', 'tslint'], function () {
    return gulp.src(paths.allSrcTs)
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest(paths.dirBuild));
});

gulp.task("tslint", () => {
    return gulp.src(paths.allSrcTs)
        .pipe(tslint({formatter: "verbose"}))
        .pipe(tslint.report())
});