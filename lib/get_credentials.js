'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var nodeInquirer = require('inquirer');
var nodeKeytar = require('keytar');

var isPresent = function isPresent(attribute) {
  return function (value) {
    if (value && value.length > 1) {
      return true;
    } else {
      return '' + attribute + ' is a required property';
    }
  };
};

var Credentials = (function () {
  function Credentials(_ref) {
    var project = _ref.project;
    var _ref$inquirer = _ref.inquirer;
    var inquirer = _ref$inquirer === undefined ? nodeInquirer : _ref$inquirer;
    var _ref$keytar = _ref.keytar;
    var keytar = _ref$keytar === undefined ? nodeKeytar : _ref$keytar;

    _classCallCheck(this, Credentials);

    this.keyForUsername = 'grunt-tx:username';
    this.keyForPassword = 'grunt-tx:password';

    this.project = project;
    this.inquirer = inquirer;
    this.keytar = keytar;
  }

  _createClass(Credentials, [{
    key: 'askFor',
    value: function askFor(attribute, message) {
      var questions;
      return regeneratorRuntime.async(function askFor$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            questions = [{
              name: attribute,
              type: 'input',
              message: message,
              validate: isPresent(attribute)
            }];
            return context$2$0.abrupt('return', new Promise(function (resolve) {
              _this.inquirer.prompt(questions, function (answers) {
                resolve(answers[attribute]);
              });
            }));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getUsername',
    value: function getUsername() {
      var username;
      return regeneratorRuntime.async(function getUsername$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!process.env.TRANSIFEX_USER) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', process.env.TRANSIFEX_USER);

          case 2:
            username = this.keytar.getPassword(this.keyForUsername, this.project);

            if (!username) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', username);

          case 5:
            context$2$0.next = 7;
            return regeneratorRuntime.awrap(this.askFor('username', 'What is the username for ' + this.project + ' on Transifex?'));

          case 7:
            username = context$2$0.sent;

            this.keytar.addPassword(this.keyForUsername, this.project, username);
            return context$2$0.abrupt('return', username);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getPassword',
    value: function getPassword() {
      var password;
      return regeneratorRuntime.async(function getPassword$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!process.env.TRANSIFEX_PASSWORD) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', process.env.TRANSIFEX_PASSWORD);

          case 2:
            password = this.keytar.getPassword(this.keyForPassword, this.project);

            if (!password) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', password);

          case 5:
            context$2$0.next = 7;
            return regeneratorRuntime.awrap(this.askFor('password', 'What is the password for ' + this.project + ' on Transifex?'));

          case 7:
            password = context$2$0.sent;

            this.keytar.addPassword(this.keyForPassword, this.project, password);
            return context$2$0.abrupt('return', password);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Credentials;
})();

module.exports = function callee$0$0(_ref2) {
  var project = _ref2.project;
  var inquirer = _ref2.inquirer;
  var keytar = _ref2.keytar;
  var credentials;
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        credentials = new Credentials({ project: project, inquirer: inquirer, keytar: keytar });
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(credentials.getUsername());

      case 3:
        context$1$0.t0 = context$1$0.sent;
        context$1$0.next = 6;
        return regeneratorRuntime.awrap(credentials.getPassword());

      case 6:
        context$1$0.t1 = context$1$0.sent;
        return context$1$0.abrupt('return', {
          username: context$1$0.t0,
          password: context$1$0.t1
        });

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvZ2V0X2NyZWRlbnRpYWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUN4QyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXBDLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBUyxDQUFZLFNBQVMsRUFBRTtBQUNwQyxTQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFFBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLGFBQU8sSUFBSSxDQUFBO0tBQ1osTUFBTTtBQUNMLGtCQUFVLFNBQVMsNkJBQXlCO0tBQzdDO0dBQ0YsQ0FBQTtDQUNGLENBQUE7O0lBRUssV0FBVztBQUlKLFdBSlAsV0FBVyxDQUlILElBQXVELEVBQUU7UUFBeEQsT0FBTyxHQUFSLElBQXVELENBQXRELE9BQU87d0JBQVIsSUFBdUQsQ0FBN0MsUUFBUTtRQUFSLFFBQVEsaUNBQUcsWUFBWTtzQkFBakMsSUFBdUQsQ0FBcEIsTUFBTTtRQUFOLE1BQU0sK0JBQUcsVUFBVTs7MEJBSjlELFdBQVc7O1NBQ2YsY0FBYyxHQUFHLG1CQUFtQjtTQUNwQyxjQUFjLEdBQUcsbUJBQW1COztBQUdsQyxRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtBQUN0QixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUN4QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtHQUNyQjs7ZUFSRyxXQUFXOztXQVVILGdCQUFDLFNBQVMsRUFBRSxPQUFPO1VBQ3ZCLFNBQVM7Ozs7OztBQUFULHFCQUFTLEdBQUcsQ0FBQztBQUNqQixrQkFBSSxFQUFFLFNBQVM7QUFDZixrQkFBSSxFQUFFLE9BQU87QUFDYixxQkFBTyxFQUFFLE9BQU87QUFDaEIsc0JBQVEsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDO2FBQy9CLENBQUM7Z0RBRUssSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDNUIsb0JBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQSxPQUFPLEVBQUk7QUFDekMsdUJBQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtlQUM1QixDQUFDLENBQUE7YUFDSCxDQUFDOzs7Ozs7O0tBQ0g7OztXQUVnQjtVQUtYLFFBQVE7Ozs7aUJBSlIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjOzs7OztnREFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjOzs7QUFHL0Isb0JBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7O2lCQUNyRSxRQUFROzs7OztnREFDSCxRQUFROzs7OzRDQUdBLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxnQ0FBOEIsSUFBSSxDQUFDLE9BQU8sb0JBQWlCOzs7QUFBbEcsb0JBQVE7O0FBQ1IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtnREFDN0QsUUFBUTs7Ozs7OztLQUNoQjs7O1dBRWdCO1VBS1gsUUFBUTs7OztpQkFKUixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjs7Ozs7Z0RBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCOzs7QUFHbkMsb0JBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7O2lCQUNyRSxRQUFROzs7OztnREFDSCxRQUFROzs7OzRDQUdBLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxnQ0FBOEIsSUFBSSxDQUFDLE9BQU8sb0JBQWlCOzs7QUFBbEcsb0JBQVE7O0FBQ1IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtnREFDN0QsUUFBUTs7Ozs7OztLQUNoQjs7O1NBckRHLFdBQVc7OztBQXdEakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBZSxLQUEyQjtNQUExQixPQUFPLEdBQVIsS0FBMkIsQ0FBMUIsT0FBTztNQUFFLFFBQVEsR0FBbEIsS0FBMkIsQ0FBakIsUUFBUTtNQUFFLE1BQU0sR0FBMUIsS0FBMkIsQ0FBUCxNQUFNO01BQ2xELFdBQVc7Ozs7QUFBWCxtQkFBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQzs7d0NBRzlDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7Ozs7O3dDQUN6QixXQUFXLENBQUMsV0FBVyxFQUFFOzs7OztBQUR6QyxrQkFBUTtBQUNSLGtCQUFROzs7Ozs7OztDQUVYLENBQUEiLCJmaWxlIjoiZ2V0X2NyZWRlbnRpYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKVxuY29uc3Qgbm9kZUtleXRhciA9IHJlcXVpcmUoJ2tleXRhcicpXG5cbmNvbnN0IGlzUHJlc2VudCA9IGZ1bmN0aW9uKGF0dHJpYnV0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2F0dHJpYnV0ZX0gaXMgYSByZXF1aXJlZCBwcm9wZXJ0eWBcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ3JlZGVudGlhbHMge1xuICBrZXlGb3JVc2VybmFtZSA9ICdncnVudC10eDp1c2VybmFtZSdcbiAga2V5Rm9yUGFzc3dvcmQgPSAnZ3J1bnQtdHg6cGFzc3dvcmQnXG5cbiAgY29uc3RydWN0b3Ioe3Byb2plY3QsIGlucXVpcmVyID0gbm9kZUlucXVpcmVyLCBrZXl0YXIgPSBub2RlS2V5dGFyfSkge1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RcbiAgICB0aGlzLmlucXVpcmVyID0gaW5xdWlyZXJcbiAgICB0aGlzLmtleXRhciA9IGtleXRhclxuICB9XG5cbiAgYXN5bmMgYXNrRm9yKGF0dHJpYnV0ZSwgbWVzc2FnZSkge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFt7XG4gICAgICBuYW1lOiBhdHRyaWJ1dGUsXG4gICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIHZhbGlkYXRlOiBpc1ByZXNlbnQoYXR0cmlidXRlKVxuICAgIH1dXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmlucXVpcmVyLnByb21wdChxdWVzdGlvbnMsIGFuc3dlcnMgPT4ge1xuICAgICAgICByZXNvbHZlKGFuc3dlcnNbYXR0cmlidXRlXSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJuYW1lKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5UUkFOU0lGRVhfVVNFUikge1xuICAgICAgcmV0dXJuIHByb2Nlc3MuZW52LlRSQU5TSUZFWF9VU0VSXG4gICAgfVxuXG4gICAgbGV0IHVzZXJuYW1lID0gdGhpcy5rZXl0YXIuZ2V0UGFzc3dvcmQodGhpcy5rZXlGb3JVc2VybmFtZSwgdGhpcy5wcm9qZWN0KVxuICAgIGlmICh1c2VybmFtZSkge1xuICAgICAgcmV0dXJuIHVzZXJuYW1lXG4gICAgfVxuXG4gICAgdXNlcm5hbWUgPSBhd2FpdCB0aGlzLmFza0ZvcigndXNlcm5hbWUnLCBgV2hhdCBpcyB0aGUgdXNlcm5hbWUgZm9yICR7dGhpcy5wcm9qZWN0fSBvbiBUcmFuc2lmZXg/YClcbiAgICB0aGlzLmtleXRhci5hZGRQYXNzd29yZCh0aGlzLmtleUZvclVzZXJuYW1lLCB0aGlzLnByb2plY3QsIHVzZXJuYW1lKVxuICAgIHJldHVybiB1c2VybmFtZVxuICB9XG5cbiAgYXN5bmMgZ2V0UGFzc3dvcmQoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52LlRSQU5TSUZFWF9QQVNTV09SRCkge1xuICAgICAgcmV0dXJuIHByb2Nlc3MuZW52LlRSQU5TSUZFWF9QQVNTV09SRFxuICAgIH1cblxuICAgIGxldCBwYXNzd29yZCA9IHRoaXMua2V5dGFyLmdldFBhc3N3b3JkKHRoaXMua2V5Rm9yUGFzc3dvcmQsIHRoaXMucHJvamVjdClcbiAgICBpZiAocGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBwYXNzd29yZFxuICAgIH1cblxuICAgIHBhc3N3b3JkID0gYXdhaXQgdGhpcy5hc2tGb3IoJ3Bhc3N3b3JkJywgYFdoYXQgaXMgdGhlIHBhc3N3b3JkIGZvciAke3RoaXMucHJvamVjdH0gb24gVHJhbnNpZmV4P2ApXG4gICAgdGhpcy5rZXl0YXIuYWRkUGFzc3dvcmQodGhpcy5rZXlGb3JQYXNzd29yZCwgdGhpcy5wcm9qZWN0LCBwYXNzd29yZClcbiAgICByZXR1cm4gcGFzc3dvcmRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uKHtwcm9qZWN0LCBpbnF1aXJlciwga2V5dGFyfSkge1xuICBjb25zdCBjcmVkZW50aWFscyA9IG5ldyBDcmVkZW50aWFscyh7cHJvamVjdCwgaW5xdWlyZXIsIGtleXRhcn0pXG5cbiAgcmV0dXJuIHtcbiAgICB1c2VybmFtZTogYXdhaXQgY3JlZGVudGlhbHMuZ2V0VXNlcm5hbWUoKSxcbiAgICBwYXNzd29yZDogYXdhaXQgY3JlZGVudGlhbHMuZ2V0UGFzc3dvcmQoKVxuICB9XG59XG4iXX0=