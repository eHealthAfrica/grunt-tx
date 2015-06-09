/*
 * grunt-tx
 * https://github.com/eHealthAfrica/grunt-tx
 *
 * Copyright (c) 2015 Robin Mehner
 * Licensed under the Apache, 2.0 licenses.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    tx: {
      'grunt-tx-testbed': [
        {
          sourceFile: './spec/fixtures/po/template.pot',
          targetFilePath: './spec/fixtures/po/_lang_._type_',
          type: 'PO'
        }
      ]
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};
