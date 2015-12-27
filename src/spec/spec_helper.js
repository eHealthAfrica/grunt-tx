require('source-map-support').install()

// rethrow unhandled promise rejections
process.on('unhandledRejection', reason => { throw reason })
