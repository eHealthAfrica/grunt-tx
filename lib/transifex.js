'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var nodeFetch = require('node-fetch');

module.exports = (function () {
  function Transifex(_ref) {
    var username = _ref.username;
    var password = _ref.password;
    var project = _ref.project;
    var _ref$fetch = _ref.fetch;
    var fetch = _ref$fetch === undefined ? nodeFetch : _ref$fetch;

    _classCallCheck(this, Transifex);

    this._fetch = fetch;
    this.authHeader = 'Basic ' + new Buffer('' + username + ':' + password).toString('base64');
    this.baseUrl = 'https://www.transifex.com/api/2/project/' + project;
  }

  _createClass(Transifex, [{
    key: 'fetch',
    value: function fetch(endpoint) {
      var options = arguments[1] === undefined ? {} : arguments[1];
      var response;
      return regeneratorRuntime.async(function fetch$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            options.headers = options.headers || {};
            options.headers.Authorization = this.authHeader;

            context$2$0.next = 4;
            return regeneratorRuntime.awrap(this._fetch('' + this.baseUrl + '/' + endpoint, options));

          case 4:
            response = context$2$0.sent;
            return context$2$0.abrupt('return', response.ok ? response : Promise.reject(response.statusText));

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getResources',
    value: function getResources() {
      var response;
      return regeneratorRuntime.async(function getResources$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.fetch('resources'));

          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.json());

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getResource',
    value: function getResource(resourceSlug) {
      var response;
      return regeneratorRuntime.async(function getResource$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.fetch('resource/' + resourceSlug + '/?details'));

          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.json());

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'uploadResource',
    value: function uploadResource(resourceSlug, type, content) {
      var body, options, response;
      return regeneratorRuntime.async(function uploadResource$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            body = JSON.stringify({
              i18n_type: type, // eslint-disable-line camelcase
              content: content
            });
            options = {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
              },
              body: body
            };
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(this.fetch('resource/' + resourceSlug + '/content', options));

          case 4:
            response = context$2$0.sent;
            context$2$0.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getTranslations',
    value: function getTranslations(resourceSlug, languageCode) {
      var response;
      return regeneratorRuntime.async(function getTranslations$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.fetch('resource/' + resourceSlug + '/translation/' + languageCode + '?file'));

          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.text());

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Transifex;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvdHJhbnNpZmV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTs7QUFFdkMsTUFBTSxDQUFDLE9BQU87QUFDRCxXQURVLFNBQVMsQ0FDbEIsSUFBZ0QsRUFBRTtRQUFqRCxRQUFRLEdBQVQsSUFBZ0QsQ0FBL0MsUUFBUTtRQUFFLFFBQVEsR0FBbkIsSUFBZ0QsQ0FBckMsUUFBUTtRQUFFLE9BQU8sR0FBNUIsSUFBZ0QsQ0FBM0IsT0FBTztxQkFBNUIsSUFBZ0QsQ0FBbEIsS0FBSztRQUFMLEtBQUssOEJBQUcsU0FBUzs7MEJBRHRDLFNBQVM7O0FBRTVCLFFBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBQ25CLFFBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLElBQUksTUFBTSxNQUFJLFFBQVEsU0FBSSxRQUFRLENBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDckYsUUFBSSxDQUFDLE9BQU8sZ0RBQThDLE9BQU8sQUFBRSxDQUFBO0dBQ3BFOztlQUxvQixTQUFTOztXQU9uQixlQUFDLFFBQVE7VUFBRSxPQUFPLGdDQUFHLEVBQUU7VUFJMUIsUUFBUTs7OztBQUhkLG1CQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0FBQ3ZDLG1CQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBOzs7NENBRXhCLElBQUksQ0FBQyxNQUFNLE1BQUksSUFBSSxDQUFDLE9BQU8sU0FBSSxRQUFRLEVBQUksT0FBTyxDQUFDOzs7QUFBcEUsb0JBQVE7Z0RBQ1AsUUFBUSxDQUFDLEVBQUUsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ3BFOzs7V0FFaUI7VUFDVixRQUFROzs7Ozs0Q0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQXhDLG9CQUFROzs0Q0FDRCxRQUFRLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7O0tBQzdCOzs7V0FFZ0IscUJBQUMsWUFBWTtVQUN0QixRQUFROzs7Ozs0Q0FBUyxJQUFJLENBQUMsS0FBSyxlQUFhLFlBQVksZUFBWTs7O0FBQWhFLG9CQUFROzs0Q0FDRCxRQUFRLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7O0tBQzdCOzs7V0FFbUIsd0JBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPO1VBQ3hDLElBQUksRUFLSixPQUFPLEVBVVAsUUFBUTs7OztBQWZSLGdCQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMxQix1QkFBUyxFQUFFLElBQUk7QUFDZixxQkFBTyxFQUFFLE9BQU87YUFDakIsQ0FBQztBQUVJLG1CQUFPLEdBQUc7QUFDZCxvQkFBTSxFQUFFLEtBQUs7QUFDYixxQkFBTyxFQUFFO0FBQ1Asd0JBQVEsRUFBRSxrQkFBa0I7QUFDNUIsOEJBQWMsRUFBRSxrQkFBa0I7QUFDbEMsZ0NBQWdCLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7ZUFDMUM7QUFDRCxrQkFBSSxFQUFFLElBQUk7YUFDWDs7NENBRXNCLElBQUksQ0FBQyxLQUFLLGVBQWEsWUFBWSxlQUFZLE9BQU8sQ0FBQzs7O0FBQXhFLG9CQUFROzs0Q0FDRCxRQUFRLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7O0tBQzdCOzs7V0FFb0IseUJBQUMsWUFBWSxFQUFFLFlBQVk7VUFDeEMsUUFBUTs7Ozs7NENBQVMsSUFBSSxDQUFDLEtBQUssZUFBYSxZQUFZLHFCQUFnQixZQUFZLFdBQVE7OztBQUF4RixvQkFBUTs7NENBQ0QsUUFBUSxDQUFDLElBQUksRUFBRTs7Ozs7Ozs7OztLQUM3Qjs7O1NBaERvQixTQUFTO0lBa0QvQixDQUFBIiwiZmlsZSI6InRyYW5zaWZleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVGZXRjaCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRyYW5zaWZleCB7XG4gIGNvbnN0cnVjdG9yKHt1c2VybmFtZSwgcGFzc3dvcmQsIHByb2plY3QsIGZldGNoID0gbm9kZUZldGNofSkge1xuICAgIHRoaXMuX2ZldGNoID0gZmV0Y2hcbiAgICB0aGlzLmF1dGhIZWFkZXIgPSAnQmFzaWMgJyArIG5ldyBCdWZmZXIoYCR7dXNlcm5hbWV9OiR7cGFzc3dvcmR9YCkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgdGhpcy5iYXNlVXJsID0gYGh0dHBzOi8vd3d3LnRyYW5zaWZleC5jb20vYXBpLzIvcHJvamVjdC8ke3Byb2plY3R9YFxuICB9XG5cbiAgYXN5bmMgZmV0Y2goZW5kcG9pbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIG9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gdGhpcy5hdXRoSGVhZGVyXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZldGNoKGAke3RoaXMuYmFzZVVybH0vJHtlbmRwb2ludH1gLCBvcHRpb25zKVxuICAgIHJldHVybiByZXNwb25zZS5vayA/IHJlc3BvbnNlIDogUHJvbWlzZS5yZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dClcbiAgfVxuXG4gIGFzeW5jIGdldFJlc291cmNlcygpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2goJ3Jlc291cmNlcycpXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICB9XG5cbiAgYXN5bmMgZ2V0UmVzb3VyY2UocmVzb3VyY2VTbHVnKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoKGByZXNvdXJjZS8ke3Jlc291cmNlU2x1Z30vP2RldGFpbHNgKVxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgfVxuXG4gIGFzeW5jIHVwbG9hZFJlc291cmNlKHJlc291cmNlU2x1ZywgdHlwZSwgY29udGVudCkge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpMThuX3R5cGU6IHR5cGUsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgICBjb250ZW50OiBjb250ZW50XG4gICAgfSlcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBCdWZmZXIuYnl0ZUxlbmd0aChib2R5KVxuICAgICAgfSxcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2goYHJlc291cmNlLyR7cmVzb3VyY2VTbHVnfS9jb250ZW50YCwgb3B0aW9ucylcbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gIH1cblxuICBhc3luYyBnZXRUcmFuc2xhdGlvbnMocmVzb3VyY2VTbHVnLCBsYW5ndWFnZUNvZGUpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2goYHJlc291cmNlLyR7cmVzb3VyY2VTbHVnfS90cmFuc2xhdGlvbi8ke2xhbmd1YWdlQ29kZX0/ZmlsZWApXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRleHQoKVxuICB9XG5cbn1cbiJdfQ==