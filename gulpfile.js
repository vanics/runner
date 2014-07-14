var gulp = require('gulp'),
  path = require('path'),
  exec = require('child_process').exec;

gulp.task('keyfile', function(done){
  var key = path.resolve('./keys/mongodb-keyfile');
  exec('openssl rand -base64 741 > ' + key, function(err){
    if(err) return done(err);
    exec('chmod 600 ' + key, function(err){
      if(err) return done(err);

      console.log('- ' + key);
      done();
    });
  });
});

gulp.task('pem', function(done){
  var out = path.resolve('./keys/mongodb-cert.crt'),
    keyout = path.resolve('./keys/mongodb-cert.key'),
    pem = path.resolve('./keys/mongodb.pem');

  exec('openssl req -new -x509 -days 365 -nodes ' +
    '-out ' + out + ' -keyout ' + keyout + ' '+
    '-subj "/C=US/ST=NY/L=NYC/CN=www.mongodb.com"', function(err){
      if(err) return done(err);

      exec('cat ' + out + ' ' + keyout + ' > ' + pem, function(err){
        if(err) return done(err);
        console.log('- ' + out);
        console.log('- ' + keyout);
        console.log('- ' + pem);

        done();
      });
    });
});
