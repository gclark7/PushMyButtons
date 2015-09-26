
/*
npm install gulp gulp-file gulp-prompt gulp-concat gulp-minify-css gulp-uglify gulp-babel gulp-htmlmin --save-dev
*/
var gulp = require('gulp');
var file = require('gulp-file');
var prompter = require('gulp-prompt');
var concat = require('gulp-concat');
var cssMin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
/*variables*/
var jsGroup = {
    all: ['js/app.js', 'js/modules/*.module.js', 'js/constants/*.constant.js', 'js/controllers/*.controller.js', 'js/factories/*.factory.js', 'js/directives/*.directive.js' ]
};

/*tasks*/
gulp.task('hello',function(){
	console.log('i am doing things');
});
gulp.task('angular', angularProject);
gulp.task('minCss', minCss);
gulp.task('minJs', minJs);
gulp.task('minHtml', minHtml);
gulp.task('watch', watch);
/*Gulp processes*/
function watch() {
    gulp.watch(jsGroup.all, ['minJs']);
    gulp.watch('css/*.css', ['minCss']);
    gulp.watch('index.html', ['minHtml']);
    console.log('watching...waiting...');
}

function minHtml() {
    return gulp.src('index.html').pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeRedundantAttributes: true,
    })).pipe(gulp.dest('public'));
}

function minJs() {
    return gulp.src(jsGroup.all)
    .pipe(babel())
    /*.pipe(concat('script.js'))*/
    .pipe(concat('app.js'))
    //.pipe(gulp.dest('./js')).pipe(concat('script.min.js')).pipe(uglify({
    .pipe(gulp.dest('./js')).pipe(concat('app.js')).pipe(uglify({
        preserveComments: "some"
    })).pipe(gulp.dest('./public/js'));
}

function minCss() {
    return gulp.src('css/*.css').pipe(concat('app.css')).pipe(gulp.dest('./css')).pipe(concat('app.css')).pipe(cssMin()).pipe(gulp.dest('./public/css'));
}

function angularProject() {
    return gulp.src('/').pipe(prompter.prompt({
        type: 'input',
        name: 'project',
        message: 'project name:'
    }, function(res) {
        jsGroup = {
            all: ['js/app.js', 'js/modules/*.module.js', 'js/constants/*.constant.js', 'js/controllers/*.controller.js', 'js/factories/*.factory.js', 'js/directives/*.directive.js']
        };
        var mutator = 0;
        res.project = res.project || "project";
        gulp.src('/' + mutator++).pipe(file('index.html', [])).pipe(gulp.dest(''));
        gulp.src('/' + mutator++).pipe(file('app.css', [])).pipe(gulp.dest('css'));
        gulp.src('/' + mutator++).pipe(file(res.project + '.constant.js', [])).pipe(gulp.dest('js/constants'));
        gulp.src('/' + mutator++).pipe(file(res.project + '.controller.js', [])).pipe(gulp.dest('js/controllers'));
        gulp.src('/' + mutator++).pipe(file(res.project + '.directive.js', [])).pipe(gulp.dest('js/directives'));
        gulp.src('/' + mutator++).pipe(file(res.project + '.factory.js', [])).pipe(gulp.dest('js/factories'));
        gulp.src('/' + mutator++).pipe(file(res.project + '.module.js', [])).pipe(gulp.dest('js/modules'));
        gulp.src('/' + mutator++).pipe(file(res.project + 'app.js', [])).pipe(gulp.dest('js/'));
        setTimeout(function() {
            watch();
        }, 2000);
    }));
}

