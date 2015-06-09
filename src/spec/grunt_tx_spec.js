require('./spec_helper')
const assert = require('assert')
const sinon = require('sinon')
const GruntTx = require('../lib/grunt_tx')

describe('GruntTx', () => {
  const project = 'grunt-tx-test'

  beforeEach(function() {
    /* eslint-disable camelcase */
    this.transifex = {
      getResources: sinon.stub().returns(
        [{
          source_language_code: 'en',
          name: 'template.pot',
          i18n_type: 'PO',
          priority: '0',
          slug: 'templatepot',
          categories: null
        }]
      ),
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
        available_languages:
         [ { code_aliases: ' ', code: 'en', name: 'English' },
           { code_aliases: ' ', code: 'fr', name: 'French' } ],
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
    }
    /* eslint-enable camelcase */

    this.grunt = {
      file: {
        write: sinon.stub(),
        read: sinon.stub().returns('original resource')
      },
      log: {
        ok: sinon.stub()
      }
    }
  })

  describe('#downloadResources', () => {
    it('throws an error if it cannot find the local resource in the remote resources', async function() {
      const localResources = [
        {
          sourceFile: './po/does-not-exist-remotely.pot',
          targetFilePath: './po/_lang_._type_',
          type: 'PO'
        }
      ]

      const gruntTx = new GruntTx({project, localResources, transifex: this.transifex, grunt: this.grunt})
      let error

      try {
        await gruntTx.downloadResources()
      } catch (e) {
        error = e
      }

      assert(
        /remote resource for/.test(error.toString())
      )
    })

    it('downloads the translation file of the resources to the configured path', async function() {
      const localResources = [
        {
          sourceFile: './po/template.pot',
          targetFilePath: './po/_lang_._type_',
          type: 'PO'
        }
      ]

      this.transifex.getTranslations.withArgs('templatepot', 'en').returns('english translations')
      this.transifex.getTranslations.withArgs('templatepot', 'fr').returns('french translations')

      const gruntTx = new GruntTx({project, localResources, transifex: this.transifex, grunt: this.grunt})
      await gruntTx.downloadResources()

      assert(this.grunt.file.write.calledWith('./po/en.po', 'english translations'))
      assert(this.grunt.file.write.calledWith('./po/fr.po', 'french translations'))
    })
  })

  describe('#uploadResources', () => {
    it('uploads the configured resources to transifex', async function() {
      const localResources = [
        {
          sourceFile: './po/template.pot',
          targetFilePath: './po/_lang_._type_',
          type: 'PO'
        }
      ]

      this.grunt.file.read.withArgs('./po/template.pot').returns('contents of template.pot')

      const gruntTx = new GruntTx({project, localResources, transifex: this.transifex, grunt: this.grunt})
      await gruntTx.uploadResources()

      assert(this.transifex.uploadResource.calledWith('templatepot', 'PO', 'contents of template.pot'))
    })
  })
})
