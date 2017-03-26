const gulp = require('gulp')
const concat = require('gulp-concat');                            				//- 多个文件合并为一个；
const minifyCss = require('gulp-minify-css'); 

gulp.task('concatCss', function() {                                				//- 创建一个名为 concat 的 task
    gulp.src(['./src/assets/css/mui.min.css'])   								//- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('mui.min.css'))                              				//- 合并后的文件名
        .pipe(minifyCss())                                         				//- 压缩处理成一行
        .pipe(gulp.dest('./dist/assets/css'));                                	//- 输出文件本地
});

gulp.task('default', [ 'concatCss'])

