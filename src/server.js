const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;

const React = require('react');
const Router = require('react-router');
const path = require('path');

app.get('/', function(req ,res) {
  res.send('hello world');
})

app.listen(PORT, _ => console.log("server on port: %s", PORT));
