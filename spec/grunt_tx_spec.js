'use strict';

require('./spec_helper');
var assert = require('assert');
var sinon = require('sinon');
var GruntTx = require('../lib/grunt_tx');

describe('GruntTx', function () {
  var project = 'grunt-tx-test';

  beforeEach(function () {
    /* eslint-disable camelcase */
    this.transifex = {
      getResources: sinon.stub().returns([{
        source_language_code: 'en',
        name: 'template.pot',
        i18n_type: 'PO',
        priority: '0',
        slug: 'templatepot',
        categories: null
      }]),
      getResource: sinon.stub().returns({
        source_language_code: 'en',
        name: 'template.pot',
        created: '2015-05-13T09:34:08.379',
        wordcount: 753,
        i18n_type: 'PO',
        project_slug: 'grunt-tx-testbed',
        accept_translations: true,
        last_update: '2015-05-13T10:07:55.148',
        priority: '0',
        available_languages: [{ code_aliases: ' ', code: 'en', name: 'English' }, { code_aliases: ' ', code: 'fr', name: 'French' }],
        total_entities: 156,
        slug: 'templatepot',
        categories: null
      }),
      getTranslations: sinon.stub(),
      uploadResource: sinon.stub().returns({
        strings_added: 1,
        strings_updated: 5,
        strings_delete: 3
      })
    };
    /* eslint-enable camelcase */

    this.grunt = {
      file: {
        write: sinon.stub(),
        read: sinon.stub().returns('original resource')
      },
      log: {
        ok: sinon.stub()
      }
    };
  });

  describe('#downloadResources', function () {
    it('throws an error if it cannot find the local resource in the remote resources', function callee$2$0() {
      var localResources, gruntTx, error;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localResources = [{
              sourceFile: './po/does-not-exist-remotely.pot',
              targetFilePath: './po/_lang_._type_',
              type: 'PO'
            }];
            gruntTx = new GruntTx({ project: project, localResources: localResources, transifex: this.transifex, grunt: this.grunt });
            error = undefined;
            context$3$0.prev = 3;
            context$3$0.next = 6;
            return regeneratorRuntime.awrap(gruntTx.downloadResources());

          case 6:
            context$3$0.next = 11;
            break;

          case 8:
            context$3$0.prev = 8;
            context$3$0.t0 = context$3$0['catch'](3);

            error = context$3$0.t0;

          case 11:

            assert(/remote resource for/.test(error.toString()));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[3, 8]]);
    });

    it('downloads the translation file of the resources to the configured path', function callee$2$0() {
      var localResources, gruntTx;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localResources = [{
              sourceFile: './po/template.pot',
              targetFilePath: './po/_lang_._type_',
              type: 'PO'
            }];

            this.transifex.getTranslations.withArgs('templatepot', 'en').returns('english translations');
            this.transifex.getTranslations.withArgs('templatepot', 'fr').returns('french translations');

            gruntTx = new GruntTx({ project: project, localResources: localResources, transifex: this.transifex, grunt: this.grunt });
            context$3$0.next = 6;
            return regeneratorRuntime.awrap(gruntTx.downloadResources());

          case 6:

            assert(this.grunt.file.write.calledWith('./po/en.po', 'english translations'));
            assert(this.grunt.file.write.calledWith('./po/fr.po', 'french translations'));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('#uploadResources', function () {
    it('uploads the configured resources to transifex', function callee$2$0() {
      var localResources, gruntTx;
      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localResources = [{
              sourceFile: './po/template.pot',
              targetFilePath: './po/_lang_._type_',
              type: 'PO'
            }];

            this.grunt.file.read.withArgs('./po/template.pot').returns('contents of template.pot');

            gruntTx = new GruntTx({ project: project, localResources: localResources, transifex: this.transifex, grunt: this.grunt });
            context$3$0.next = 5;
            return regeneratorRuntime.awrap(gruntTx.uploadResources());

          case 5:

            assert(this.transifex.uploadResource.calledWith('templatepot', 'PO', 'contents of template.pot'));

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGVjL2dydW50X3R4X3NwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDeEIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2hDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7QUFFMUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQTs7QUFFL0IsWUFBVSxDQUFDLFlBQVc7O0FBRXBCLFFBQUksQ0FBQyxTQUFTLEdBQUc7QUFDZixrQkFBWSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQ2hDLENBQUM7QUFDQyw0QkFBb0IsRUFBRSxJQUFJO0FBQzFCLFlBQUksRUFBRSxjQUFjO0FBQ3BCLGlCQUFTLEVBQUUsSUFBSTtBQUNmLGdCQUFRLEVBQUUsR0FBRztBQUNiLFlBQUksRUFBRSxhQUFhO0FBQ25CLGtCQUFVLEVBQUUsSUFBSTtPQUNqQixDQUFDLENBQ0g7QUFDRCxpQkFBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDaEMsNEJBQW9CLEVBQUUsSUFBSTtBQUMxQixZQUFJLEVBQUUsY0FBYztBQUNwQixlQUFPLEVBQUUseUJBQXlCO0FBQ2xDLGlCQUFTLEVBQUUsR0FBRztBQUNkLGlCQUFTLEVBQUUsSUFBSTtBQUNmLG9CQUFZLEVBQUUsa0JBQWtCO0FBQ2hDLDJCQUFtQixFQUFFLElBQUk7QUFDekIsbUJBQVcsRUFBRSx5QkFBeUI7QUFDdEMsZ0JBQVEsRUFBRSxHQUFHO0FBQ2IsMkJBQW1CLEVBQ2xCLENBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMs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QUM5RSxDQUFDLENBQUE7R0FDSCxDQUFDLENBQUE7O0FBRUYsVUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBRSxDQUFDLCtDQUErQyxFQUFFO1VBQzVDLGNBQWMsRUFVZCxPQUFPOzs7O0FBVlAsMEJBQWMsR0FBRyxDQUNyQjtBQUNFLHdCQUFVLEVBQUUsbUJBQW1CO0FBQy9CLDRCQUFjLEVBQUUsb0JBQW9CO0FBQ3BDLGtCQUFJLEVBQUUsSUFBSTthQUNYLENBQ0Y7O0FBRUQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQTs7QUFFaEYsbUJBQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsY0FBYyxFQUFkLGNBQWMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDOzs0Q0FDOUYsT0FBTyxDQUFDLGVBQWUsRUFBRTs7OztBQUUvQixrQkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixDQUFDLENBQUMsQ0FBQTs7Ozs7OztLQUNsRyxDQUFDLENBQUE7R0FDSCxDQUFDLENBQUE7Q0FDSCxDQUFDLENBQUEiLCJmaWxlIjoiZ3J1bnRfdHhfc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vc3BlY19oZWxwZXInKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHNpbm9uID0gcmVxdWlyZSgnc2lub24nKVxuY29uc3QgR3J1bnRUeCA9IHJlcXVpcmUoJy4uL2xpYi9ncnVudF90eCcpXG5cbmRlc2NyaWJlKCdHcnVudFR4JywgKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0ID0gJ2dydW50LXR4LXRlc3QnXG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICB0aGlzLnRyYW5zaWZleCA9IHtcbiAgICAgIGdldFJlc291cmNlczogc2lub24uc3R1YigpLnJldHVybnMoXG4gICAgICAgIFt7XG4gICAgICAgICAgc291cmNlX2xhbmd1YWdlX2NvZGU6ICdlbicsXG4gICAgICAgICAgbmFtZTogJ3RlbXBsYXRlLnBvdCcsXG4gICAgICAgICAgaTE4bl90eXBlOiAnUE8nLFxuICAgICAgICAgIHByaW9yaXR5OiAnMCcsXG4gICAgICAgICAgc2x1ZzogJ3RlbXBsYXRlcG90JyxcbiAgICAgICAgICBjYXRlZ29yaWVzOiBudWxsXG4gICAgICAgIH1dXG4gICAgICApLFxuICAgICAgZ2V0UmVzb3VyY2U6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHtcbiAgICAgICAgc291cmNlX2xhbmd1YWdlX2NvZGU6ICdlbicsXG4gICAgICAgIG5hbWU6ICd0ZW1wbGF0ZS5wb3QnLFxuICAgICAgICBjcmVhdGVkOiAnMjAxNS0wNS0xM1QwOTozNDowOC4zNzknLFxuICAgICAgICB3b3JkY291bnQ6IDc1MyxcbiAgICAgICAgaTE4bl90eXBlOiAnUE8nLFxuICAgICAgICBwcm9qZWN0X3NsdWc6ICdncnVudC10eC10ZXN0YmVkJyxcbiAgICAgICAgYWNjZXB0X3RyYW5zbGF0aW9uczogdHJ1ZSxcbiAgICAgICAgbGFzdF91cGRhdGU6ICcyMDE1LTA1LTEzVDEwOjA3OjU1LjE0OCcsXG4gICAgICAgIHByaW9yaXR5OiAnMCcsXG4gICAgICAgIGF2YWlsYWJsZV9sYW5ndWFnZXM6XG4gICAgICAgICBbIHsgY29kZV9hbGlhc2VzOiAnICcsIGNvZGU6ICdlbicsIG5hbWU6ICdFbmdsaXNoJyB9LFxuICAgICAgICAgICB7IGNvZGVfYWxpYXNlczogJyAnLCBjb2RlOiAnZnInLCBuYW1lOiAnRnJlbmNoJyB9IF0sXG4gICAgICAgIHRvdGFsX2VudGl0aWVzOiAxNTYsXG4gICAgICAgIHNsdWc6ICd0ZW1wbGF0ZXBvdCcsXG4gICAgICAgIGNhdGVnb3JpZXM6IG51bGxcbiAgICAgIH0pLFxuICAgICAgZ2V0VHJhbnNsYXRpb25zOiBzaW5vbi5zdHViKCksXG4gICAgICB1cGxvYWRSZXNvdXJjZTogc2lub24uc3R1YigpLnJldHVybnMoe1xuICAgICAgICBzdHJpbmdzX2FkZGVkOiAxLFxuICAgICAgICBzdHJpbmdzX3VwZGF0ZWQ6IDUsXG4gICAgICAgIHN0cmluZ3NfZGVsZXRlOiAzXG4gICAgICB9KVxuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuXG4gICAgdGhpcy5ncnVudCA9IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgd3JpdGU6IHNpbm9uLnN0dWIoKSxcbiAgICAgICAgcmVhZDogc2lub24uc3R1YigpLnJldHVybnMoJ29yaWdpbmFsIHJlc291cmNlJylcbiAgICAgIH0sXG4gICAgICBsb2c6IHtcbiAgICAgICAgb2s6IHNpbm9uLnN0dWIoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZXNjcmliZSgnI2Rvd25sb2FkUmVzb3VyY2VzJywgKCkgPT4ge1xuICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgaWYgaXQgY2Fubm90IGZpbmQgdGhlIGxvY2FsIHJlc291cmNlIGluIHRoZSByZW1vdGUgcmVzb3VyY2VzJywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsb2NhbFJlc291cmNlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHNvdXJjZUZpbGU6ICcuL3BvL2RvZXMtbm90LWV4aXN0LXJlbW90ZWx5LnBvdCcsXG4gICAgICAgICAgdGFyZ2V0RmlsZVBhdGg6ICcuL3BvL19sYW5nXy5fdHlwZV8nLFxuICAgICAgICAgIHR5cGU6ICdQTydcbiAgICAgICAgfVxuICAgICAgXVxuXG4gICAgICBjb25zdCBncnVudFR4ID0gbmV3IEdydW50VHgoe3Byb2plY3QsIGxvY2FsUmVzb3VyY2VzLCB0cmFuc2lmZXg6IHRoaXMudHJhbnNpZmV4LCBncnVudDogdGhpcy5ncnVudH0pXG4gICAgICBsZXQgZXJyb3JcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZ3J1bnRUeC5kb3dubG9hZFJlc291cmNlcygpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yID0gZVxuICAgICAgfVxuXG4gICAgICBhc3NlcnQoXG4gICAgICAgIC9yZW1vdGUgcmVzb3VyY2UgZm9yLy50ZXN0KGVycm9yLnRvU3RyaW5nKCkpXG4gICAgICApXG4gICAgfSlcblxuICAgIGl0KCdkb3dubG9hZHMgdGhlIHRyYW5zbGF0aW9uIGZpbGUgb2YgdGhlIHJlc291cmNlcyB0byB0aGUgY29uZmlndXJlZCBwYXRoJywgYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsb2NhbFJlc291cmNlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHNvdXJjZUZpbGU6ICcuL3BvL3RlbXBsYXRlLnBvdCcsXG4gICAgICAgICAgdGFyZ2V0RmlsZVBhdGg6ICcuL3BvL19sYW5nXy5fdHlwZV8nLFxuICAgICAgICAgIHR5cGU6ICdQTydcbiAgICAgICAgfVxuICAgICAgXVxuXG4gICAgICB0aGlzLnRyYW5zaWZleC5nZXRUcmFuc2xhdGlvbnMud2l0aEFyZ3MoJ3RlbXBsYXRlcG90JywgJ2VuJykucmV0dXJucygnZW5nbGlzaCB0cmFuc2xhdGlvbnMnKVxuICAgICAgdGhpcy50cmFuc2lmZXguZ2V0VHJhbnNsYXRpb25zLndpdGhBcmdzKCd0ZW1wbGF0ZXBvdCcsICdmcicpLnJldHVybnMoJ2ZyZW5jaCB0cmFuc2xhdGlvbnMnKVxuXG4gICAgICBjb25zdCBncnVudFR4ID0gbmV3IEdydW50VHgoe3Byb2plY3QsIGxvY2FsUmVzb3VyY2VzLCB0cmFuc2lmZXg6IHRoaXMudHJhbnNpZmV4LCBncnVudDogdGhpcy5ncnVudH0pXG4gICAgICBhd2FpdCBncnVudFR4LmRvd25sb2FkUmVzb3VyY2VzKClcblxuICAgICAgYXNzZXJ0KHRoaXMuZ3J1bnQuZmlsZS53cml0ZS5jYWxsZWRXaXRoKCcuL3BvL2VuLnBvJywgJ2VuZ2xpc2ggdHJhbnNsYXRpb25zJykpXG4gICAgICBhc3NlcnQodGhpcy5ncnVudC5maWxlLndyaXRlLmNhbGxlZFdpdGgoJy4vcG8vZnIucG8nLCAnZnJlbmNoIHRyYW5zbGF0aW9ucycpKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJyN1cGxvYWRSZXNvdXJjZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3VwbG9hZHMgdGhlIGNvbmZpZ3VyZWQgcmVzb3VyY2VzIHRvIHRyYW5zaWZleCcsIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbG9jYWxSZXNvdXJjZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBzb3VyY2VGaWxlOiAnLi9wby90ZW1wbGF0ZS5wb3QnLFxuICAgICAgICAgIHRhcmdldEZpbGVQYXRoOiAnLi9wby9fbGFuZ18uX3R5cGVfJyxcbiAgICAgICAgICB0eXBlOiAnUE8nXG4gICAgICAgIH1cbiAgICAgIF1cblxuICAgICAgdGhpcy5ncnVudC5maWxlLnJlYWQud2l0aEFyZ3MoJy4vcG8vdGVtcGxhdGUucG90JykucmV0dXJucygnY29udGVudHMgb2YgdGVtcGxhdGUucG90JylcblxuICAgICAgY29uc3QgZ3J1bnRUeCA9IG5ldyBHcnVudFR4KHtwcm9qZWN0LCBsb2NhbFJlc291cmNlcywgdHJhbnNpZmV4OiB0aGlzLnRyYW5zaWZleCwgZ3J1bnQ6IHRoaXMuZ3J1bnR9KVxuICAgICAgYXdhaXQgZ3J1bnRUeC51cGxvYWRSZXNvdXJjZXMoKVxuXG4gICAgICBhc3NlcnQodGhpcy50cmFuc2lmZXgudXBsb2FkUmVzb3VyY2UuY2FsbGVkV2l0aCgndGVtcGxhdGVwb3QnLCAnUE8nLCAnY29udGVudHMgb2YgdGVtcGxhdGUucG90JykpXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=