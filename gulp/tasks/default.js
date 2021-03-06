/**
 *  Default task
 *
 * 'default:dev' immediatly work on sources files.
 * 'default:prod' generate a deployable build and serve it to check if it's ok to deploy.
 */

import gutil from 'gulp-util';

import runSequence from 'run-sequence';

gulp.task('default', function() {
  if (config.args.env === 'prod') {
    gulp.start('default:prod');
  } else if (config.args.env === 'dev') {
    gulp.start('default:dev');
  }
});

gulp.task('default:dev', function() {

  runSequence(['markup:all', 'styles:fonts', 'styles', 'scripts', 'images'], ['serve', 'watch']);

});

gulp.task('default:prod', function() {

  runSequence(['markup:all', 'styles:fonts', 'images'], 'build', function() {
    if (config.args.serve) {
      gulp.start('serve');
    } else {
      process.exit();
    }
    gutil.log(gutil.colors.yellow('Build ready, preparing to serve...'));
  });

});
