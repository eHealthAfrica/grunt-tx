const nodeFetch = require('node-fetch')

module.exports = class Transifex {
  constructor ({username, password, project, fetch = nodeFetch}) {
    this._fetch = fetch
    this.authHeader = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64')
    this.baseUrl = `https://www.transifex.com/api/2/project/${project}`
  }

  async fetch (endpoint, options = {}) {
    options.headers = options.headers || {}
    options.headers.Authorization = this.authHeader

    const response = await this._fetch(`${this.baseUrl}/${endpoint}`, options)
    return response.ok ? response : Promise.reject(response.statusText)
  }

  async getResources () {
    const response = await this.fetch('resources')
    return await response.json()
  }

  async getResource (resourceSlug) {
    const response = await this.fetch(`resource/${resourceSlug}/?details`)
    return await response.json()
  }

  async uploadResource (resourceSlug, type, content) {
    const body = JSON.stringify({
      i18n_type: type, // eslint-disable-line camelcase
      content: content
    })

    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      body: body
    }

    const response = await this.fetch(`resource/${resourceSlug}/content`, options)
    return await response.json()
  }

  async getTranslations (resourceSlug, languageCode) {
    const response = await this.fetch(`resource/${resourceSlug}/translation/${languageCode}?file`)
    return await response.text()
  }

}
