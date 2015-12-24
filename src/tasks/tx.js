// rethrow unhandled promise rejections
process.on('unhandledRejection', reason => { throw reason })

require('babel/polyfill')
const Transifex = require('../lib/transifex')
const GruntTx = require('../lib/grunt_tx')
const getCredentials = require('../lib/get_credentials')

module.exports = grunt => {
  const defineTxTask = function (action) {
    if (['download', 'upload'].indexOf(action) === -1) {
      throw new Error(`Can't define task for '${action}'`)
    }

    return async function() {
      const config = grunt.config().tx || grunt.fatal('No config key `tx` found, please check your Gruntfile.js')
      const projects = Object.keys(config)

      if (projects.length === 0) {
        grunt.fatal('You did not define any projects in your Gruntfile.js')
      }

      const done = this.async()

      for (let project of projects) {
        const credentials = await getCredentials({project})
        const transifex = new Transifex({project, username: credentials.username, password: credentials.password})
        const localResources = config[project]
        const gruntTx = new GruntTx({transifex, project, localResources, grunt})
        if (action === 'download') {
          await gruntTx.downloadResources()
        } else {
          await gruntTx.uploadResources()
        }
      }
      done()
    }
  }

  grunt.registerTask('tx:download', 'Download string translations from Transifex', defineTxTask('download'))
  grunt.registerTask('tx:upload', 'Upload resources to Transifex', defineTxTask('upload'))
}
