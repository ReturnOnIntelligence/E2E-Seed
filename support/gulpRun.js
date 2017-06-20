const gulp = require('gulp');
const cucumber = require('gulp-cucumber');
const child_process = require('child_process');
const paths = require('./settings').paths;
const argv = require('yargs').argv

const getOption = (tag) => {
    return {
        steps: paths.dirBuild + '/stepDefinitions/*.js',
        support: paths.dirBuild + '/support/*.js',
        format: 'json:' + paths.reportFolder + '/' + tag + '.json',
        tags: '@' + tag
    };
};

gulp.task('run-by-tag', ['build-ts'], () => {
    return gulp.src(paths.allFeatures).pipe(cucumber(getOption(argv.task)));
});

gulp.task('dev-run-cleanup', ['clean-reports', 'build-ts'], () => {
    return gulp.src(paths.allFeatures).pipe(cucumber(getOption('cleanup')));
});

gulp.task('dev-run-test', ['clean-reports', 'build-ts'], () => {
    return gulp.src(paths.allFeatures).pipe(cucumber(getOption('test')));
});