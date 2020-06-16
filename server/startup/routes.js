const express = require('express');
const path = require('path');

const users = require('../routes/users');

const baseUrl = process.env.BASE_URL;

/* 
This module retuns a function that, when called attaches
all of the routes within to the app object passed in
*/

module.exports = app => {
  // Traditional Routes
  app.use(`${baseUrl}/users`, users);

  // Static files
  if (process.env.NODE_ENV !== 'development') {
    app.use('/dist', express.static(path.join(__dirname, '../../dist')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }

  // Catch all
  app.use('*', (req, res) => res.sendStatus(404));
};
