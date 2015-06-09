'use strict';

require('./spec_helper');
var assert = require('assert');
var sinon = require('sinon');
var Transifex = require('../lib/transifex');

describe('Transifex', function () {
  var username = 'grunt-tx';
  var password = 's3cr3t';
  var project = 'grunt-tx-test';

  describe('#fetch', function () {
    it('issues a project scoped request to the Transifex endpoint', function callee$2$0() {
      var fetch, transifex;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            fetch = sinon.stub().returns({ ok: true });
            transifex = new Transifex({ username: username, password: password, project: project, fetch: fetch });
            context$3$0.next = 4;
            return regeneratorRuntime.awrap(transifex.fetch('resources'));

          case 4:

            assert.equal('https://www.transifex.com/api/2/project/grunt-tx-test/resources', fetch.firstCall.args[0]);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('adds the auth header', function callee$2$0() {
      var fetch, transifex;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            fetch = sinon.stub().returns({ ok: true });
            transifex = new Transifex({ username: username, password: password, project: project, fetch: fetch });
            context$3$0.next = 4;
            return regeneratorRuntime.awrap(transifex.fetch('resources'));

          case 4:

            assert(/Basic/.test(fetch.firstCall.args[1].headers.Authorization));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('returns a rejected promise with the statusText if response is not ok', function callee$2$0() {
      var fetch, transifex, error;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            fetch = sinon.stub().returns({ ok: false, statusText: 'Not Found' });
            transifex = new Transifex({ username: username, password: password, project: project, fetch: fetch });
            error = undefined;
            context$3$0.prev = 3;
            context$3$0.next = 6;
            return regeneratorRuntime.awrap(transifex.fetch('resources'));

          case 6:
            context$3$0.next = 11;
            break;

          case 8:
            context$3$0.prev = 8;
            context$3$0.t0 = context$3$0['catch'](3);

            error = context$3$0.t0;

          case 11:

            assert(/Not Found/.test(error.toString()));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[3, 8]]);
    });
  });

  describe('#uploadResource', function () {
    beforeEach(function () {
      this.fetch = sinon.stub().returns({
        ok: true,
        json: function json() {
          return {};
        }
      });

      this.transifex = new Transifex({ username: username, password: password, project: project, fetch: this.fetch });
    });

    it('sets the right content length header', function callee$2$0() {
      var fetchOptions;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return regeneratorRuntime.awrap(this.transifex.uploadResource('resource', 'PO', 'PO FILE WITH METAL ÜMLAUTS'));

          case 2:
            fetchOptions = this.fetch.firstCall.args[1];

            assert.equal(Buffer.byteLength(fetchOptions.body), fetchOptions.headers['Content-Length']);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('issues a PUT request', function callee$2$0() {
      var fetchOptions;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return regeneratorRuntime.awrap(this.transifex.uploadResource('resource', 'PO', 'content'));

          case 2:
            fetchOptions = this.fetch.firstCall.args[1];

            assert.equal(fetchOptions.method, 'PUT');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// String.prototype.length does not report the right length when there are umlauts
// Transifex refuses the upload if the mandatory header `Content-Length` reports
// the wrong length
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGVjL3RyYW5zaWZleF9zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNoQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7O0FBRTdDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtBQUMxQixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUE7QUFDM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3pCLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQTs7QUFFL0IsVUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQ3ZCLE1BQUUsQ0FBQywyREFBMkQsRUFBRTtVQUN4RCxLQUFLLEVBQ0wsU0FBUzs7OztBQURULGlCQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsQ0FBQztBQUN4QyxxQkFBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFSLFFBQVEsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBQyxDQUFDOzs0Q0FDL0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7QUFFbEMsa0JBQU0sQ0FBQyxLQUFLLENBQUMsaUVBQWlFLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7Ozs7OztLQUN6RyxDQUFDLENBQUE7O0FBRUYsTUFBRSxDQUFDLHNCQUFzQixFQUFFO1VBQ25CLEtBQUssRUFDTCxTQUFTOzs7O0FBRFQsaUJBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxF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IjoidHJhbnNpZmV4X3NwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL3NwZWNfaGVscGVyJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCBzaW5vbiA9IHJlcXVpcmUoJ3Npbm9uJylcbmNvbnN0IFRyYW5zaWZleCA9IHJlcXVpcmUoJy4uL2xpYi90cmFuc2lmZXgnKVxuXG5kZXNjcmliZSgnVHJhbnNpZmV4JywgKCkgPT4ge1xuICBjb25zdCB1c2VybmFtZSA9ICdncnVudC10eCdcbiAgY29uc3QgcGFzc3dvcmQgPSAnczNjcjN0J1xuICBjb25zdCBwcm9qZWN0ID0gJ2dydW50LXR4LXRlc3QnXG5cbiAgZGVzY3JpYmUoJyNmZXRjaCcsICgpID0+IHtcbiAgICBpdCgnaXNzdWVzIGEgcHJvamVjdCBzY29wZWQgcmVxdWVzdCB0byB0aGUgVHJhbnNpZmV4IGVuZHBvaW50JywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBmZXRjaCA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHtvazogdHJ1ZX0pXG4gICAgICBjb25zdCB0cmFuc2lmZXggPSBuZXcgVHJhbnNpZmV4KHt1c2VybmFtZSwgcGFzc3dvcmQsIHByb2plY3QsIGZldGNofSlcbiAgICAgIGF3YWl0IHRyYW5zaWZleC5mZXRjaCgncmVzb3VyY2VzJylcblxuICAgICAgYXNzZXJ0LmVxdWFsKCdodHRwczovL3d3dy50cmFuc2lmZXguY29tL2FwaS8yL3Byb2plY3QvZ3J1bnQtdHgtdGVzdC9yZXNvdXJjZXMnLCBmZXRjaC5maXJzdENhbGwuYXJnc1swXSlcbiAgICB9KVxuXG4gICAgaXQoJ2FkZHMgdGhlIGF1dGggaGVhZGVyJywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBmZXRjaCA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHtvazogdHJ1ZX0pXG4gICAgICBjb25zdCB0cmFuc2lmZXggPSBuZXcgVHJhbnNpZmV4KHt1c2VybmFtZSwgcGFzc3dvcmQsIHByb2plY3QsIGZldGNofSlcbiAgICAgIGF3YWl0IHRyYW5zaWZleC5mZXRjaCgncmVzb3VyY2VzJylcblxuICAgICAgYXNzZXJ0KFxuICAgICAgICAvQmFzaWMvLnRlc3QoZmV0Y2guZmlyc3RDYWxsLmFyZ3NbMV0uaGVhZGVycy5BdXRob3JpemF0aW9uKVxuICAgICAgKVxuICAgIH0pXG5cbiAgICBpdCgncmV0dXJucyBhIHJlamVjdGVkIHByb21pc2Ugd2l0aCB0aGUgc3RhdHVzVGV4dCBpZiByZXNwb25zZSBpcyBub3Qgb2snLCBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGZldGNoID0gc2lub24uc3R1YigpLnJldHVybnMoe29rOiBmYWxzZSwgc3RhdHVzVGV4dDogJ05vdCBGb3VuZCd9KVxuICAgICAgY29uc3QgdHJhbnNpZmV4ID0gbmV3IFRyYW5zaWZleCh7dXNlcm5hbWUsIHBhc3N3b3JkLCBwcm9qZWN0LCBmZXRjaH0pXG4gICAgICBsZXQgZXJyb3JcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdHJhbnNpZmV4LmZldGNoKCdyZXNvdXJjZXMnKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvciA9IGVcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0KFxuICAgICAgICAvTm90IEZvdW5kLy50ZXN0KGVycm9yLnRvU3RyaW5nKCkpXG4gICAgICApXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnI3VwbG9hZFJlc291cmNlJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZldGNoID0gc2lub24uc3R1YigpLnJldHVybnMoe1xuICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAganNvbigpIHtcbiAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgdGhpcy50cmFuc2lmZXggPSBuZXcgVHJhbnNpZmV4KHt1c2VybmFtZSwgcGFzc3dvcmQsIHByb2plY3QsIGZldGNoOiB0aGlzLmZldGNofSlcbiAgICB9KVxuXG4gICAgaXQoJ3NldHMgdGhlIHJpZ2h0IGNvbnRlbnQgbGVuZ3RoIGhlYWRlcicsIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gU3RyaW5nLnByb3RvdHlwZS5sZW5ndGggZG9lcyBub3QgcmVwb3J0IHRoZSByaWdodCBsZW5ndGggd2hlbiB0aGVyZSBhcmUgdW1sYXV0c1xuICAgICAgLy8gVHJhbnNpZmV4IHJlZnVzZXMgdGhlIHVwbG9hZCBpZiB0aGUgbWFuZGF0b3J5IGhlYWRlciBgQ29udGVudC1MZW5ndGhgIHJlcG9ydHNcbiAgICAgIC8vIHRoZSB3cm9uZyBsZW5ndGhcbiAgICAgIGF3YWl0IHRoaXMudHJhbnNpZmV4LnVwbG9hZFJlc291cmNlKCdyZXNvdXJjZScsICdQTycsICdQTyBGSUxFIFdJVEggTUVUQUwgw5xNTEFVVFMnKVxuXG4gICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB0aGlzLmZldGNoLmZpcnN0Q2FsbC5hcmdzWzFdXG4gICAgICBhc3NlcnQuZXF1YWwoQnVmZmVyLmJ5dGVMZW5ndGgoZmV0Y2hPcHRpb25zLmJvZHkpLCBmZXRjaE9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSlcbiAgICB9KVxuXG4gICAgaXQoJ2lzc3VlcyBhIFBVVCByZXF1ZXN0JywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBhd2FpdCB0aGlzLnRyYW5zaWZleC51cGxvYWRSZXNvdXJjZSgncmVzb3VyY2UnLCAnUE8nLCAnY29udGVudCcpXG5cbiAgICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHRoaXMuZmV0Y2guZmlyc3RDYWxsLmFyZ3NbMV1cbiAgICAgIGFzc2VydC5lcXVhbChmZXRjaE9wdGlvbnMubWV0aG9kLCAnUFVUJylcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==