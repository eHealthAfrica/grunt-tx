'use strict';

require('./spec_helper');
var assert = require('assert');
var sinon = require('sinon');
var getCredentials = require('../lib/get_credentials');

describe('getCredentials', function () {
  var project = 'grunt-tx-test';

  beforeEach(function () {
    delete process.env.TRANSIFEX_USER;
    delete process.env.TRANSIFEX_PASSWORD;
  });

  it('returns the credentials from the environment', function callee$1$0() {
    var credentials;
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          process.env.TRANSIFEX_USER = 'grunt-tx';
          process.env.TRANSIFEX_PASSWORD = 's3cr3t';

          context$2$0.next = 4;
          return regeneratorRuntime.awrap(getCredentials({ project: project }));

        case 4:
          credentials = context$2$0.sent;

          assert.equal('grunt-tx', credentials.username);
          assert.equal('s3cr3t', credentials.password);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('uses the credentials from the keychain if they exist', function callee$1$0() {
    var getPassword, keytar, credentials;
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getPassword = sinon.stub();

          getPassword.withArgs('grunt-tx:username', project).returns('grunt-tx-from-keychain');
          getPassword.withArgs('grunt-tx:password', project).returns('s3cr3t-from-keychain');
          keytar = {
            getPassword: getPassword
          };
          context$2$0.next = 6;
          return regeneratorRuntime.awrap(getCredentials({ project: project, keytar: keytar }));

        case 6:
          credentials = context$2$0.sent;

          assert.equal('grunt-tx-from-keychain', credentials.username);
          assert.equal('s3cr3t-from-keychain', credentials.password);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('prompts the user if it cannot find credentials and saves them to the keychain', function callee$1$0() {
    var getPassword, addPassword, usernameSaveSpy, passwordSaveSpy, keytar, prompt, inquirer;
    return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getPassword = sinon.stub().returns(null);
          addPassword = sinon.spy();
          usernameSaveSpy = addPassword.withArgs('grunt-tx:username', project, 'grunt-tx-test');
          passwordSaveSpy = addPassword.withArgs('grunt-tx:password', project, 's3cr3t');
          keytar = { getPassword: getPassword, addPassword: addPassword };
          prompt = sinon.stub();

          prompt.onCall(0).callsArgWith(1, { username: 'grunt-tx-test' });
          prompt.onCall(1).callsArgWith(1, { password: 's3cr3t' });
          inquirer = { prompt: prompt };
          context$2$0.next = 11;
          return regeneratorRuntime.awrap(getCredentials({ project: project, keytar: keytar, inquirer: inquirer }));

        case 11:
          assert(usernameSaveSpy.calledOnce);
          assert(passwordSaveSpy.calledOnce);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGVjL2dldF9jcmVkZW50aWFsc19zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNoQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUIsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUE7O0FBRXhELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFNO0FBQy9CLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQTs7QUFFL0IsWUFBVSxDQUFDLFlBQU07QUFDZixXQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFBO0FBQ2pDLFdBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQTtHQUN0QyxDQUFDLENBQUE7O0FBRUYsSUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBSTNDLFdBQVc7Ozs7QUFIakIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQTtBQUN2QyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUE7OzswQ0FFZixjQUFjLENBQUMsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQUM7OztBQUE3QyxxQkFBVzs7QUFDakIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM5QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7Ozs7O0dBQzdDLENBQUMsQ0FBQTs7QUFFRixJQUFFLENBQUMsc0RBQXNELEVBQUU7UUFDckQsV0FBVyxFQUdULE1BQU0sRUFJTixXQUFXOzs7O0FBUGIscUJBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFOztBQUM5QixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtBQUNwRixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtBQUM1RSxnQkFBTSxHQUFHO0FBQ2IsdUJBQVcsRUFBRSxXQUFXO1dBQ3pCOzswQ0FFeUIsY0FBYyxDQUFDLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQUM7OztBQUFyRCxxQkFBVzs7QUFDakIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzVELGdCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7OztHQUMzRCxDQUFDLENBQUE7O0FBRUYsSUFBRSxDQUFDLCtFQUErRSxFQUFFO1FBQzVFLFdBQVcsRUFDWCxXQUFXLEVBQ1gsZUFBZSxFQUNmLGVBQWUsRUFDZixNQUFNLEVBRU4sTUFBTSxFQUdOLFFBQVE7Ozs7QUFUUixxQkFBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hDLHFCQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUN6Qix5QkFBZSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQztBQUNyRix5QkFBZSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztBQUM5RSxnQkFBTSxHQUFHLEVBQUMsV0FBVyxFQUFYLFdBQVcsRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFDO0FBRW5DLGdCQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRTs7QUFDM0IsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQyxDQUFBO0FBQzdELGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtBQUNoRCxrQkFBUSxHQUFHLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBQzs7MENBRW5CLGNBQWMsQ0FBQyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDLENBQUM7OztBQUNqRCxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNsQyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTs7Ozs7OztHQUNuQyxDQUFDLENBQUE7Q0FDSCxDQUFDLENBQUEiLCJmaWxlIjoiZ2V0X2NyZWRlbnRpYWxzX3NwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL3NwZWNfaGVscGVyJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCBzaW5vbiA9IHJlcXVpcmUoJ3Npbm9uJylcbmNvbnN0IGdldENyZWRlbnRpYWxzID0gcmVxdWlyZSgnLi4vbGliL2dldF9jcmVkZW50aWFscycpXG5cbmRlc2NyaWJlKCdnZXRDcmVkZW50aWFscycsICgpID0+IHtcbiAgY29uc3QgcHJvamVjdCA9ICdncnVudC10eC10ZXN0J1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGRlbGV0ZSBwcm9jZXNzLmVudi5UUkFOU0lGRVhfVVNFUlxuICAgIGRlbGV0ZSBwcm9jZXNzLmVudi5UUkFOU0lGRVhfUEFTU1dPUkRcbiAgfSlcblxuICBpdCgncmV0dXJucyB0aGUgY3JlZGVudGlhbHMgZnJvbSB0aGUgZW52aXJvbm1lbnQnLCBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBwcm9jZXNzLmVudi5UUkFOU0lGRVhfVVNFUiA9ICdncnVudC10eCdcbiAgICBwcm9jZXNzLmVudi5UUkFOU0lGRVhfUEFTU1dPUkQgPSAnczNjcjN0J1xuXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBnZXRDcmVkZW50aWFscyh7cHJvamVjdH0pXG4gICAgYXNzZXJ0LmVxdWFsKCdncnVudC10eCcsIGNyZWRlbnRpYWxzLnVzZXJuYW1lKVxuICAgIGFzc2VydC5lcXVhbCgnczNjcjN0JywgY3JlZGVudGlhbHMucGFzc3dvcmQpXG4gIH0pXG5cbiAgaXQoJ3VzZXMgdGhlIGNyZWRlbnRpYWxzIGZyb20gdGhlIGtleWNoYWluIGlmIHRoZXkgZXhpc3QnLCBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBsZXQgZ2V0UGFzc3dvcmQgPSBzaW5vbi5zdHViKClcbiAgICBnZXRQYXNzd29yZC53aXRoQXJncygnZ3J1bnQtdHg6dXNlcm5hbWUnLCBwcm9qZWN0KS5yZXR1cm5zKCdncnVudC10eC1mcm9tLWtleWNoYWluJylcbiAgICBnZXRQYXNzd29yZC53aXRoQXJncygnZ3J1bnQtdHg6cGFzc3dvcmQnLCBwcm9qZWN0KS5yZXR1cm5zKCdzM2NyM3QtZnJvbS1rZXljaGFpbicpXG4gICAgY29uc3Qga2V5dGFyID0ge1xuICAgICAgZ2V0UGFzc3dvcmQ6IGdldFBhc3N3b3JkXG4gICAgfVxuXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBnZXRDcmVkZW50aWFscyh7cHJvamVjdCwga2V5dGFyfSlcbiAgICBhc3NlcnQuZXF1YWwoJ2dydW50LXR4LWZyb20ta2V5Y2hhaW4nLCBjcmVkZW50aWFscy51c2VybmFtZSlcbiAgICBhc3NlcnQuZXF1YWwoJ3MzY3IzdC1mcm9tLWtleWNoYWluJywgY3JlZGVudGlhbHMucGFzc3dvcmQpXG4gIH0pXG5cbiAgaXQoJ3Byb21wdHMgdGhlIHVzZXIgaWYgaXQgY2Fubm90IGZpbmQgY3JlZGVudGlhbHMgYW5kIHNhdmVzIHRoZW0gdG8gdGhlIGtleWNoYWluJywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZ2V0UGFzc3dvcmQgPSBzaW5vbi5zdHViKCkucmV0dXJucyhudWxsKVxuICAgIGNvbnN0IGFkZFBhc3N3b3JkID0gc2lub24uc3B5KClcbiAgICBjb25zdCB1c2VybmFtZVNhdmVTcHkgPSBhZGRQYXNzd29yZC53aXRoQXJncygnZ3J1bnQtdHg6dXNlcm5hbWUnLCBwcm9qZWN0LCAnZ3J1bnQtdHgtdGVzdCcpXG4gICAgY29uc3QgcGFzc3dvcmRTYXZlU3B5ID0gYWRkUGFzc3dvcmQud2l0aEFyZ3MoJ2dydW50LXR4OnBhc3N3b3JkJywgcHJvamVjdCwgJ3MzY3IzdCcpXG4gICAgY29uc3Qga2V5dGFyID0ge2dldFBhc3N3b3JkLCBhZGRQYXNzd29yZH1cblxuICAgIGNvbnN0IHByb21wdCA9IHNpbm9uLnN0dWIoKVxuICAgIHByb21wdC5vbkNhbGwoMCkuY2FsbHNBcmdXaXRoKDEsIHt1c2VybmFtZTogJ2dydW50LXR4LXRlc3QnfSlcbiAgICBwcm9tcHQub25DYWxsKDEpLmNhbGxzQXJnV2l0aCgxLCB7cGFzc3dvcmQ6ICdzM2NyM3QnfSlcbiAgICBjb25zdCBpbnF1aXJlciA9IHtwcm9tcHR9XG5cbiAgICBhd2FpdCBnZXRDcmVkZW50aWFscyh7cHJvamVjdCwga2V5dGFyLCBpbnF1aXJlcn0pXG4gICAgYXNzZXJ0KHVzZXJuYW1lU2F2ZVNweS5jYWxsZWRPbmNlKVxuICAgIGFzc2VydChwYXNzd29yZFNhdmVTcHkuY2FsbGVkT25jZSlcbiAgfSlcbn0pXG4iXX0=