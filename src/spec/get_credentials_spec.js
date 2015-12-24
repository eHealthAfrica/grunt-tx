/* global beforeEach, describe, it */

require('./spec_helper')
const assert = require('assert')
const sinon = require('sinon')
const getCredentials = require('../lib/get_credentials')

describe('getCredentials', () => {
  const project = 'grunt-tx-test'

  beforeEach(() => {
    delete process.env.TRANSIFEX_USER
    delete process.env.TRANSIFEX_PASSWORD
  })

  it('returns the credentials from the environment', async function() {
    process.env.TRANSIFEX_USER = 'grunt-tx'
    process.env.TRANSIFEX_PASSWORD = 's3cr3t'

    const credentials = await getCredentials({project})
    assert.equal('grunt-tx', credentials.username)
    assert.equal('s3cr3t', credentials.password)
  })

  it('uses the credentials from the keychain if they exist', async function() {
    let getPassword = sinon.stub()
    getPassword.withArgs('grunt-tx:username', project).returns('grunt-tx-from-keychain')
    getPassword.withArgs('grunt-tx:password', project).returns('s3cr3t-from-keychain')
    const keytar = {
      getPassword: getPassword
    }

    const credentials = await getCredentials({project, keytar})
    assert.equal('grunt-tx-from-keychain', credentials.username)
    assert.equal('s3cr3t-from-keychain', credentials.password)
  })

  it('prompts the user if it cannot find credentials and saves them to the keychain', async function() {
    const getPassword = sinon.stub().returns(null)
    const addPassword = sinon.spy()
    const usernameSaveSpy = addPassword.withArgs('grunt-tx:username', project, 'grunt-tx-test')
    const passwordSaveSpy = addPassword.withArgs('grunt-tx:password', project, 's3cr3t')
    const keytar = {getPassword, addPassword}

    const prompt = sinon.stub()
    prompt.onCall(0).callsArgWith(1, {username: 'grunt-tx-test'})
    prompt.onCall(1).callsArgWith(1, {password: 's3cr3t'})
    const inquirer = {prompt}

    await getCredentials({project, keytar, inquirer})
    assert(usernameSaveSpy.calledOnce)
    assert(passwordSaveSpy.calledOnce)
  })
})
