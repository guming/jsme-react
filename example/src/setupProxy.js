const express = require('express');
const path = require('path');

const jsmeEditorDir = path.dirname(require.resolve('jsme-editor'));

module.exports = function(app) {
  app.use(
    '/jsme',
    express.static(jsmeEditorDir)
  );
};
