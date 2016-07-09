var gulp = require('gulp')
  , pkg = require('../package.json')
  , rename = require('gulp-rename')
  , awspublish = require('gulp-awspublish')

var publisher = awspublish.create({
  region: 'us-west-1',
  accessKeyId: 'AKIAJMGHFO6POVES2KSA',
  secretAccessKey: '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',
  params: {
    Bucket: 'anansi.podcast'
  }
  }, {
    cacheFileName: './build/cache'
});

var path = './build/releases/Anansi-darwin-x64/Anansi.zip'
  , headers = {
  'Cache-Control': 'max-age=315360000, no-transform, public'
};

gulp.task('upload-stable', function() {
return gulp.src(path)
  .pipe(rename(function() {
    path.dirname += '/stable';
    path.basename = pkg.version;
  }))
  .pipe(publisher.publish(headers))
  .pipe(publisher.cache())
  .pipe(awspublish.reporter());
});

gulp.task('upload-beta', function() {
return gulp.src(path)
  .pipe(rename(function() {
    path.dirname += '/beta';
    path.basename = pkg.version;
  }))
  .pipe(publisher.publish(headers))
  .pipe(publisher.cache())
  .pipe(awspublish.reporter());
});
