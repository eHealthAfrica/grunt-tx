'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var path = require('path');

var targetPathFor = function targetPathFor(localResource, languageCode) {
  if (!localResource.targetFilePath) {
    throw new Error('Please set targetFilePath for ' + localResource);
  }

  return localResource.targetFilePath.replace('_lang_', languageCode).replace('_type_', localResource.type.toLowerCase());
};

var fileNameOf = function fileNameOf(filePath) {
  return path.basename(filePath);
};

var remoteResourceFor = function remoteResourceFor(localResource, remoteResources) {
  var fileName = fileNameOf(localResource.sourceFile);
  var remoteResourceForLocal = remoteResources.find(function (resource) {
    return resource.name === fileName;
  });
  if (remoteResourceForLocal) {
    return remoteResourceForLocal;
  } else {
    throw new Error('Cannot find remote resource for ' + localResource.sourceFile);
  }
};

module.exports = (function () {
  function GruntTx(_ref) {
    var transifex = _ref.transifex;
    var project = _ref.project;
    var localResources = _ref.localResources;
    var grunt = _ref.grunt;

    _classCallCheck(this, GruntTx);

    this.transifex = transifex;
    this.project = project;
    this.localResources = localResources;
    this.grunt = grunt;
  }

  _createClass(GruntTx, [{
    key: 'downloadResources',
    value: function downloadResources() {
      var remoteResources, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, localResource, remoteResourceForLocal, remoteResource, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, language, translations, filePath;

      return regeneratorRuntime.async(function downloadResources$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.transifex.getResources());

          case 2:
            remoteResources = context$2$0.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 6;
            _iterator = this.localResources[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 47;
              break;
            }

            localResource = _step.value;
            remoteResourceForLocal = remoteResourceFor(localResource, remoteResources);
            context$2$0.next = 13;
            return regeneratorRuntime.awrap(this.transifex.getResource(remoteResourceForLocal.slug));

          case 13:
            remoteResource = context$2$0.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 17;
            _iterator2 = remoteResource.available_languages[Symbol.iterator]();

          case 19:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 30;
              break;
            }

            language = _step2.value;
            context$2$0.next = 23;
            return regeneratorRuntime.awrap(this.transifex.getTranslations(remoteResource.slug, language.code));

          case 23:
            translations = context$2$0.sent;
            filePath = targetPathFor(localResource, language.code);

            this.grunt.file.write(filePath, translations);
            this.grunt.log.ok('[' + this.project + '] Downloaded ' + language.code + ' to ' + filePath);

          case 27:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 19;
            break;

          case 30:
            context$2$0.next = 36;
            break;

          case 32:
            context$2$0.prev = 32;
            context$2$0.t0 = context$2$0['catch'](17);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t0;

          case 36:
            context$2$0.prev = 36;
            context$2$0.prev = 37;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 39:
            context$2$0.prev = 39;

            if (!_didIteratorError2) {
              context$2$0.next = 42;
              break;
            }

            throw _iteratorError2;

          case 42:
            return context$2$0.finish(39);

          case 43:
            return context$2$0.finish(36);

          case 44:
            _iteratorNormalCompletion = true;
            context$2$0.next = 8;
            break;

          case 47:
            context$2$0.next = 53;
            break;

          case 49:
            context$2$0.prev = 49;
            context$2$0.t1 = context$2$0['catch'](6);
            _didIteratorError = true;
            _iteratorError = context$2$0.t1;

          case 53:
            context$2$0.prev = 53;
            context$2$0.prev = 54;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 56:
            context$2$0.prev = 56;

            if (!_didIteratorError) {
              context$2$0.next = 59;
              break;
            }

            throw _iteratorError;

          case 59:
            return context$2$0.finish(56);

          case 60:
            return context$2$0.finish(53);

          case 61:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[6, 49, 53, 61], [17, 32, 36, 44], [37,, 39, 43], [54,, 56, 60]]);
    }
  }, {
    key: 'uploadResources',
    value: function uploadResources() {
      var remoteResources, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, localResource, remoteResourceForLocal, content, result;

      return regeneratorRuntime.async(function uploadResources$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.transifex.getResources());

          case 2:
            remoteResources = context$2$0.sent;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 6;
            _iterator3 = this.localResources[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 19;
              break;
            }

            localResource = _step3.value;
            remoteResourceForLocal = remoteResourceFor(localResource, remoteResources);
            content = this.grunt.file.read(localResource.sourceFile);
            context$2$0.next = 14;
            return regeneratorRuntime.awrap(this.transifex.uploadResource(remoteResourceForLocal.slug, localResource.type, content));

          case 14:
            result = context$2$0.sent;

            this.grunt.log.ok('[' + this.project + '] Uploaded ' + localResource.sourceFile + '. Added ' + result.strings_added + '. Updated ' + result.strings_updated + '. Deleted ' + result.strings_delete + '.');

          case 16:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 8;
            break;

          case 19:
            context$2$0.next = 25;
            break;

          case 21:
            context$2$0.prev = 21;
            context$2$0.t0 = context$2$0['catch'](6);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t0;

          case 25:
            context$2$0.prev = 25;
            context$2$0.prev = 26;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 28:
            context$2$0.prev = 28;

            if (!_didIteratorError3) {
              context$2$0.next = 31;
              break;
            }

            throw _iteratorError3;

          case 31:
            return context$2$0.finish(28);

          case 32:
            return context$2$0.finish(25);

          case 33:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[6, 21, 25, 33], [26,, 28, 32]]);
    }
  }]);

  return GruntTx;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvZ3J1bnRfdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBOztBQUU1QixJQUFNLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQVksYUFBYSxFQUFFLFlBQVksRUFBRTtBQUMxRCxNQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRTtBQUNqQyxVQUFNLElBQUksS0FBSyxvQ0FBa0MsYUFBYSxDQUFHLENBQUE7R0FDbEU7O0FBRUQsU0FBTyxhQUFhLENBQ2pCLGNBQWMsQ0FDZCxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtDQUN2RCxDQUFBOztBQUVELElBQU0sVUFBVSxHQUFHLFNBQWIsVUFBVSxDQUFZLFFBQVEsRUFBRTtBQUNwQyxTQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Q0FDL0IsQ0FBQTs7QUFFRCxJQUFNLGlCQUFpQixHQUFHLFNBQXBCLGlCQUFpQixDQUFZLGFBQWEsRUFBRSxlQUFlLEVBQUU7QUFDakUsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNyRCxNQUFNLHNCQUFzQixHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1dBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRO0dBQUEsQ0FBQyxDQUFBO0FBQzNGLE1BQUksc0JBQXNCLEVBQUU7QUFDMUIsV0FBTyxzQkFBc0IsQ0FBQTtHQUM5QixNQUFNO0FBQ0wsVUFBTSxJQUFJLEtBQUssc0NBQW9DLGFBQWEsQ0FBQyxVQUFVLENBQUcsQ0FBQTtHQUMvRTtDQUNGLENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU87QUFDRCxXQURVLE9BQU8sQ0FDaEIsSUFBMkMsRUFBRTtRQUE1QyxTQUFTLEdBQVYsSUFBMkMsQ0FBMUMsU0FBUztRQUFFLE9BQU8sR0FBbkIsSUFBMkMsQ0FBL0IsT0FBTztRQUFFLGNBQWMsR0FBbkMsSUFBMkMsQ0FBdEIsY0FBYztRQUFFLEtBQUssR0FBMUMsSUFBMkMsQ0FBTixLQUFLOzswQkFEakMsT0FBTzs7QUFFMUIsUUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7QUFDMUIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDdEIsUUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7QUFDcEMsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7R0FDbkI7O2VBTm9CLE9BQU87O1dBUUw7VUFDZixlQUFlLGtGQUVaLGFBQWEsRUFDZCxzQkFBc0IsRUFDdEIsY0FBYyx1RkFFWCxRQUFRLEVBQ1QsWUFBWSxFQUNaLFFBQVE7Ozs7Ozs0Q0FSWSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTs7O0FBQXJELDJCQUFlOzs7Ozt3QkFFSyxJQUFJLENBQUMsY0FBYzs7Ozs7Ozs7QUFBcEMseUJBQWE7QUFDZCxrQ0FBc0IsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDOzs0Q0FDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDOzs7QUFBOUUsMEJBQWM7Ozs7O3lCQUVDLGNBQWMsQ0FBQyxtQkFBbUI7Ozs7Ozs7O0FBQTlDLG9CQUFROzs0Q0FDWSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7OztBQUF2Rix3QkFBWTtBQUNaLG9CQUFRLEdBQUcsYUFBYSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDOztBQUU1RCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUM3QyxnQkFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFLLElBQUksQ0FBQyxPQUFPLHFCQUFnQixRQUFRLENBQUMsSUFBSSxZQUFPLFFBQVEsQ0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBR3RGOzs7V0FFb0I7VUFDYixlQUFlLHVGQUVaLGFBQWEsRUFDZCxzQkFBc0IsRUFDdEIsT0FBTyxFQUNQLE1BQU07Ozs7Ozs0Q0FMZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7OztBQUFyRCwyQkFBZTs7Ozs7eUJBRUssSUFBSSxDQUFDLGNBQWM7Ozs7Ozs7O0FBQXBDLHlCQUFhO0FBQ2Qsa0NBQXNCLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQztBQUMxRSxtQkFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDOzs0Q0FDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDOzs7QUFBdEcsa0JBQU07O0FBRVosZ0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FDWCxJQUFJLENBQUMsT0FBTyxtQkFBYyxhQUFhLENBQUMsVUFBVSxnQkFBVyxNQUFNLENBQUMsYUFBYSxrQkFBYSxNQUFNLENBQUMsZUFBZSxrQkFBYSxNQUFNLENBQUMsY0FBYyxPQUMzSixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBRUo7OztTQXJDb0IsT0FBTztJQXNDN0IsQ0FBQSIsImZpbGUiOiJncnVudF90eC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuY29uc3QgdGFyZ2V0UGF0aEZvciA9IGZ1bmN0aW9uKGxvY2FsUmVzb3VyY2UsIGxhbmd1YWdlQ29kZSkge1xuICBpZiAoIWxvY2FsUmVzb3VyY2UudGFyZ2V0RmlsZVBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBsZWFzZSBzZXQgdGFyZ2V0RmlsZVBhdGggZm9yICR7bG9jYWxSZXNvdXJjZX1gKVxuICB9XG5cbiAgcmV0dXJuIGxvY2FsUmVzb3VyY2VcbiAgICAudGFyZ2V0RmlsZVBhdGhcbiAgICAucmVwbGFjZSgnX2xhbmdfJywgbGFuZ3VhZ2VDb2RlKVxuICAgIC5yZXBsYWNlKCdfdHlwZV8nLCBsb2NhbFJlc291cmNlLnR5cGUudG9Mb3dlckNhc2UoKSlcbn1cblxuY29uc3QgZmlsZU5hbWVPZiA9IGZ1bmN0aW9uKGZpbGVQYXRoKSB7XG4gIHJldHVybiBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKVxufVxuXG5jb25zdCByZW1vdGVSZXNvdXJjZUZvciA9IGZ1bmN0aW9uKGxvY2FsUmVzb3VyY2UsIHJlbW90ZVJlc291cmNlcykge1xuICBjb25zdCBmaWxlTmFtZSA9IGZpbGVOYW1lT2YobG9jYWxSZXNvdXJjZS5zb3VyY2VGaWxlKVxuICBjb25zdCByZW1vdGVSZXNvdXJjZUZvckxvY2FsID0gcmVtb3RlUmVzb3VyY2VzLmZpbmQocmVzb3VyY2UgPT4gcmVzb3VyY2UubmFtZSA9PT0gZmlsZU5hbWUpXG4gIGlmIChyZW1vdGVSZXNvdXJjZUZvckxvY2FsKSB7XG4gICAgcmV0dXJuIHJlbW90ZVJlc291cmNlRm9yTG9jYWxcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIHJlbW90ZSByZXNvdXJjZSBmb3IgJHtsb2NhbFJlc291cmNlLnNvdXJjZUZpbGV9YClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEdydW50VHgge1xuICBjb25zdHJ1Y3Rvcih7dHJhbnNpZmV4LCBwcm9qZWN0LCBsb2NhbFJlc291cmNlcywgZ3J1bnR9KSB7XG4gICAgdGhpcy50cmFuc2lmZXggPSB0cmFuc2lmZXhcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG4gICAgdGhpcy5sb2NhbFJlc291cmNlcyA9IGxvY2FsUmVzb3VyY2VzXG4gICAgdGhpcy5ncnVudCA9IGdydW50XG4gIH1cblxuICBhc3luYyBkb3dubG9hZFJlc291cmNlcygpIHtcbiAgICBjb25zdCByZW1vdGVSZXNvdXJjZXMgPSBhd2FpdCB0aGlzLnRyYW5zaWZleC5nZXRSZXNvdXJjZXMoKVxuXG4gICAgZm9yIChsZXQgbG9jYWxSZXNvdXJjZSBvZiB0aGlzLmxvY2FsUmVzb3VyY2VzKSB7XG4gICAgICBjb25zdCByZW1vdGVSZXNvdXJjZUZvckxvY2FsID0gcmVtb3RlUmVzb3VyY2VGb3IobG9jYWxSZXNvdXJjZSwgcmVtb3RlUmVzb3VyY2VzKVxuICAgICAgY29uc3QgcmVtb3RlUmVzb3VyY2UgPSBhd2FpdCB0aGlzLnRyYW5zaWZleC5nZXRSZXNvdXJjZShyZW1vdGVSZXNvdXJjZUZvckxvY2FsLnNsdWcpXG5cbiAgICAgIGZvciAobGV0IGxhbmd1YWdlIG9mIHJlbW90ZVJlc291cmNlLmF2YWlsYWJsZV9sYW5ndWFnZXMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2lmZXguZ2V0VHJhbnNsYXRpb25zKHJlbW90ZVJlc291cmNlLnNsdWcsIGxhbmd1YWdlLmNvZGUpXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGFyZ2V0UGF0aEZvcihsb2NhbFJlc291cmNlLCBsYW5ndWFnZS5jb2RlKVxuXG4gICAgICAgIHRoaXMuZ3J1bnQuZmlsZS53cml0ZShmaWxlUGF0aCwgdHJhbnNsYXRpb25zKVxuICAgICAgICB0aGlzLmdydW50LmxvZy5vayhgWyR7dGhpcy5wcm9qZWN0fV0gRG93bmxvYWRlZCAke2xhbmd1YWdlLmNvZGV9IHRvICR7ZmlsZVBhdGh9YClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgY29uc3QgcmVtb3RlUmVzb3VyY2VzID0gYXdhaXQgdGhpcy50cmFuc2lmZXguZ2V0UmVzb3VyY2VzKClcblxuICAgIGZvciAobGV0IGxvY2FsUmVzb3VyY2Ugb2YgdGhpcy5sb2NhbFJlc291cmNlcykge1xuICAgICAgY29uc3QgcmVtb3RlUmVzb3VyY2VGb3JMb2NhbCA9IHJlbW90ZVJlc291cmNlRm9yKGxvY2FsUmVzb3VyY2UsIHJlbW90ZVJlc291cmNlcylcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdydW50LmZpbGUucmVhZChsb2NhbFJlc291cmNlLnNvdXJjZUZpbGUpXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnRyYW5zaWZleC51cGxvYWRSZXNvdXJjZShyZW1vdGVSZXNvdXJjZUZvckxvY2FsLnNsdWcsIGxvY2FsUmVzb3VyY2UudHlwZSwgY29udGVudClcblxuICAgICAgdGhpcy5ncnVudC5sb2cub2soXG4gICAgICAgIGBbJHt0aGlzLnByb2plY3R9XSBVcGxvYWRlZCAke2xvY2FsUmVzb3VyY2Uuc291cmNlRmlsZX0uIEFkZGVkICR7cmVzdWx0LnN0cmluZ3NfYWRkZWR9LiBVcGRhdGVkICR7cmVzdWx0LnN0cmluZ3NfdXBkYXRlZH0uIERlbGV0ZWQgJHtyZXN1bHQuc3RyaW5nc19kZWxldGV9LmBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cbiJdfQ==