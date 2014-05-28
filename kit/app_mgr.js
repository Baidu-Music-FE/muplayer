// Generated by CoffeeScript 1.7.1
(function() {
  var Q, coffee_bin, main, os;

  require('coffee-script/register');

  require('colors');

  os = require('../lib/os');

  Q = require('q');

  coffee_bin = os.path.resolve(os.path.join('node_modules', '.bin', 'coffee'));

  main = function() {
    var builder, doxx_bin, file, node_static, port, setup;
    switch (process.argv[2]) {
      case 'setup':
        setup = require('./setup');
        return setup.start();
      case 'build':
        builder = require('./builder');
        return builder.start();
      case 'doc':
        doxx_bin = 'node_modules/.bin/doxx';
        return Q.fcall((function(_this) {
          return function() {
            return os.remove('doc');
          };
        })(this)).then((function(_this) {
          return function() {
            return Q.all([os.spawn('compass', ['compile', '--sass-dir', 'src/css', '--css-dir', 'doc/css']), os.copy('src/img', 'doc/img'), os.spawn(doxx_bin, ['-d', '-R', 'README.md', '-t', "MuPlayer 『百度音乐播放内核』", '-s', 'dist', '-T', 'doc_temp', '--template', 'src/doc/base.jade'])]);
          };
        })(this)).then((function(_this) {
          return function() {
            return os.copy('doc_temp/player.js.html', 'doc/api.html');
          };
        })(this)).then((function(_this) {
          return function() {
            return os.copy('doc_temp/index.html', 'doc/index.html');
          };
        })(this)).then((function(_this) {
          return function() {
            return os.remove('doc_temp');
          };
        })(this)).then((function(_this) {
          return function() {
            return Q.all([
              os.symlink('../dist', 'doc/dist', 'dir'), os.symlink('../bower_components', 'doc/bower_components', 'dir'), os.symlink('../lib/mp3', 'doc/mp3', 'dir'), os.symlink('../src/img/favicon.ico', 'doc/favicon.ico'), os.glob('src/doc/*.html').then(function(paths) {
                var p, to, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = paths.length; _i < _len; _i++) {
                  p = paths[_i];
                  to = 'doc/' + os.path.basename(p);
                  console.log(">> Link: ".cyan + p + ' -> '.cyan + to);
                  _results.push(os.symlink('../' + p, to));
                }
                return _results;
              })
            ]);
          };
        })(this)).done((function(_this) {
          return function() {
            return console.log('>> Build doc done.'.yellow);
          };
        })(this));
      case 'server':
        port = process.argv[3] || 8077;
        node_static = require('node-static');
        file = new node_static.Server('doc');
        require('http').createServer(function(req, res) {
          return req.addListener('end', function() {
            return file.serve(req, res);
          }).resume();
        }).listen(port);
        return console.log((">> Server start at port: " + port).cyan);
    }
  };

  main();

}).call(this);
