// rethrow unhandled promise rejections
'use strict';

process.on('unhandledRejection', function (reason) {
  throw reason;
});

require('babel/polyfill');
var Transifex = require('../lib/transifex');
var GruntTx = require('../lib/grunt_tx');
var getCredentials = require('../lib/get_credentials');

module.exports = function (grunt) {
  var defineTxTask = function defineTxTask(action) {
    if (['download', 'upload'].indexOf(action) === -1) {
      throw new Error('Can\'t define task for \'' + action + '\'');
    }

    return function callee$2$0() {
      var config, projects, done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project, credentials, transifex, localResources, gruntTx;

      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            config = grunt.config().tx || grunt.fatal('No config key `tx` found, please check your Gruntfile.js');
            projects = Object.keys(config);

            if (projects.length === 0) {
              grunt.fatal('You did not define any projects in your Gruntfile.js');
            }

            done = this.async();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 7;
            _iterator = projects[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$3$0.next = 27;
              break;
            }

            project = _step.value;
            context$3$0.next = 13;
            return regeneratorRuntime.awrap(getCredentials({ project: project }));

          case 13:
            credentials = context$3$0.sent;
            transifex = new Transifex({ project: project, username: credentials.username, password: credentials.password });
            localResources = config[project];
            gruntTx = new GruntTx({ transifex: transifex, project: project, localResources: localResources, grunt: grunt });

            if (!(action === 'download')) {
              context$3$0.next = 22;
              break;
            }

            context$3$0.next = 20;
            return regeneratorRuntime.awrap(gruntTx.downloadResources());

          case 20:
            context$3$0.next = 24;
            break;

          case 22:
            context$3$0.next = 24;
            return regeneratorRuntime.awrap(gruntTx.uploadResources());

          case 24:
            _iteratorNormalCompletion = true;
            context$3$0.next = 9;
            break;

          case 27:
            context$3$0.next = 33;
            break;

          case 29:
            context$3$0.prev = 29;
            context$3$0.t0 = context$3$0['catch'](7);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 33:
            context$3$0.prev = 33;
            context$3$0.prev = 34;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 36:
            context$3$0.prev = 36;

            if (!_didIteratorError) {
              context$3$0.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return context$3$0.finish(36);

          case 40:
            return context$3$0.finish(33);

          case 41:
            done();

          case 42:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[7, 29, 33, 41], [34,, 36, 40]]);
    };
  };

  grunt.registerTask('tx:download', 'Download string translations from Transifex', defineTxTask('download'));
  grunt.registerTask('tx:upload', 'Upload resources to Transifex', defineTxTask('upload'));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXNrcy90eC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQUEsTUFBTSxFQUFJO0FBQUUsUUFBTSxNQUFNLENBQUE7Q0FBRSxDQUFDLENBQUE7O0FBRTVELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3pCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzdDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFDLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBOztBQUV4RCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUEsS0FBSyxFQUFJO0FBQ3hCLE1BQU0sWUFBWSxHQUFHLFNBQWYsWUFBWSxDQUFZLE1BQU0sRUFBRTtBQUNwQyxRQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNqRCxZQUFNLElBQUksS0FBSywrQkFBMkIsTUFBTSxRQUFJLENBQUE7S0FDckQ7O0FBRUQsV0FBTztVQUNDLE1BQU0sRUFDTixRQUFRLEVBTVIsSUFBSSxrRkFFRCxPQUFPLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxjQUFjLEVBQ2QsT0FBTzs7Ozs7QUFiVCxrQkFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQywwREFBMEQsQ0FBQztBQUNyRyxvQkFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUVwQyxnQkFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN6QixtQkFBSyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO2FBQ3BFOztBQUVLLGdCQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7Ozs7d0JBRUwsUUFBUTs7Ozs7Ozs7QUFBbkIsbUJBQU87OzRDQUNZLGNBQWMsQ0FBQyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUMsQ0FBQzs7O0FBQTdDLHVCQUFXO0FBQ1gscUJBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUMsQ0FBQztBQUNwRywwQkFBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDaEMsbUJBQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBVCxTQUFTLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxjQUFjLEVBQWQsY0FBYyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUMsQ0FBQzs7a0JBQ3BFLE1BQU0sS0FBSyxVQUFVLENBQUE7Ozs7Ozs0Q0FDakIsT0FBTyxDQUFDLGlCQUFpQixFQUFFOzs7Ozs7Ozs0Q0FFM0IsT0FBTyxDQUFDLGVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR25DLGdCQUFJLEVBQUUsQ0FBQTs7Ozs7OztLQUNQLENBQUE7R0FDRixDQUFBOztBQUVELE9BQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLDZDQUE2QyxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQzFHLE9BQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLCtCQUErQixFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0NBQ3pGLENBQUEiLCJmaWxlIjoidHguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZXRocm93IHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbnNcbnByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIHJlYXNvbiA9PiB7IHRocm93IHJlYXNvbiB9KVxuXG5yZXF1aXJlKCdiYWJlbC9wb2x5ZmlsbCcpXG5jb25zdCBUcmFuc2lmZXggPSByZXF1aXJlKCcuLi9saWIvdHJhbnNpZmV4JylcbmNvbnN0IEdydW50VHggPSByZXF1aXJlKCcuLi9saWIvZ3J1bnRfdHgnKVxuY29uc3QgZ2V0Q3JlZGVudGlhbHMgPSByZXF1aXJlKCcuLi9saWIvZ2V0X2NyZWRlbnRpYWxzJylcblxubW9kdWxlLmV4cG9ydHMgPSBncnVudCA9PiB7XG4gIGNvbnN0IGRlZmluZVR4VGFzayA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgIGlmIChbJ2Rvd25sb2FkJywgJ3VwbG9hZCddLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZGVmaW5lIHRhc2sgZm9yICcke2FjdGlvbn0nYClcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBjb25maWcgPSBncnVudC5jb25maWcoKS50eCB8fCBncnVudC5mYXRhbCgnTm8gY29uZmlnIGtleSBgdHhgIGZvdW5kLCBwbGVhc2UgY2hlY2sgeW91ciBHcnVudGZpbGUuanMnKVxuICAgICAgY29uc3QgcHJvamVjdHMgPSBPYmplY3Qua2V5cyhjb25maWcpXG5cbiAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZ3J1bnQuZmF0YWwoJ1lvdSBkaWQgbm90IGRlZmluZSBhbnkgcHJvamVjdHMgaW4geW91ciBHcnVudGZpbGUuanMnKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkb25lID0gdGhpcy5hc3luYygpXG5cbiAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBnZXRDcmVkZW50aWFscyh7cHJvamVjdH0pXG4gICAgICAgIGNvbnN0IHRyYW5zaWZleCA9IG5ldyBUcmFuc2lmZXgoe3Byb2plY3QsIHVzZXJuYW1lOiBjcmVkZW50aWFscy51c2VybmFtZSwgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkfSlcbiAgICAgICAgY29uc3QgbG9jYWxSZXNvdXJjZXMgPSBjb25maWdbcHJvamVjdF1cbiAgICAgICAgY29uc3QgZ3J1bnRUeCA9IG5ldyBHcnVudFR4KHt0cmFuc2lmZXgsIHByb2plY3QsIGxvY2FsUmVzb3VyY2VzLCBncnVudH0pXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgICBhd2FpdCBncnVudFR4LmRvd25sb2FkUmVzb3VyY2VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCBncnVudFR4LnVwbG9hZFJlc291cmNlcygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRvbmUoKVxuICAgIH1cbiAgfVxuXG4gIGdydW50LnJlZ2lzdGVyVGFzaygndHg6ZG93bmxvYWQnLCAnRG93bmxvYWQgc3RyaW5nIHRyYW5zbGF0aW9ucyBmcm9tIFRyYW5zaWZleCcsIGRlZmluZVR4VGFzaygnZG93bmxvYWQnKSlcbiAgZ3J1bnQucmVnaXN0ZXJUYXNrKCd0eDp1cGxvYWQnLCAnVXBsb2FkIHJlc291cmNlcyB0byBUcmFuc2lmZXgnLCBkZWZpbmVUeFRhc2soJ3VwbG9hZCcpKVxufVxuIl19