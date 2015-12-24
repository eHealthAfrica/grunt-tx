/* global beforeEach, describe, it */

require('./spec_helper')
const assert = require('assert')
const sinon = require('sinon')
const Transifex = require('../lib/transifex')

describe('Transifex', () => {
  const username = 'grunt-tx'
  const password = 's3cr3t'
  const project = 'grunt-tx-test'

  describe('#fetch', () => {
    it('issues a project scoped request to the Transifex endpoint', async function() {
      const fetch = sinon.stub().returns({ok: true})
      const transifex = new Transifex({username, password, project, fetch})
      await transifex.fetch('resources')

      assert.equal('https://www.transifex.com/api/2/project/grunt-tx-test/resources', fetch.firstCall.args[0])
    })

    it('adds the auth header', async function() {
      const fetch = sinon.stub().returns({ok: true})
      const transifex = new Transifex({username, password, project, fetch})
      await transifex.fetch('resources')

      assert(
        /Basic/.test(fetch.firstCall.args[1].headers.Authorization)
      )
    })

    it('returns a rejected promise with the statusText if response is not ok', async function() {
      const fetch = sinon.stub().returns({ok: false, statusText: 'Not Found'})
      const transifex = new Transifex({username, password, project, fetch})
      let error

      try {
        await transifex.fetch('resources')
      } catch (e) {
        error = e
      }

      assert(
        /Not Found/.test(error.toString())
      )
    })
  })

  describe('#uploadResource', () => {
    beforeEach(function () {
      this.fetch = sinon.stub().returns({
        ok: true,
        json () {
          return {}
        }
      })

      this.transifex = new Transifex({username, password, project, fetch: this.fetch})
    })

    it('sets the right content length header', async function() {
      // String.prototype.length does not report the right length when there are umlauts
      // Transifex refuses the upload if the mandatory header `Content-Length` reports
      // the wrong length
      await this.transifex.uploadResource('resource', 'PO', 'PO FILE WITH METAL ÜMLAUTS')

      const fetchOptions = this.fetch.firstCall.args[1]
      assert.equal(Buffer.byteLength(fetchOptions.body), fetchOptions.headers['Content-Length'])
    })

    it('issues a PUT request', async function() {
      await this.transifex.uploadResource('resource', 'PO', 'content')

      const fetchOptions = this.fetch.firstCall.args[1]
      assert.equal(fetchOptions.method, 'PUT')
    })
  })
})
