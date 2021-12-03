import gulp from 'gulp';
import del from 'del';
import { TaskFunction } from 'undertaker';

const clean: TaskFunction = (cb) => {
  del(['dist']);
  cb();
};

gulp.task('clean', clean);
