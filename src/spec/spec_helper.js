require('source-map-support').install()
require('babel/polyfill')

// rethrow unhandled promise rejections
process.on('unhandledRejection', reason => { throw reason })
