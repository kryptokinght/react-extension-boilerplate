#!/usr/bin/env node

const chromeLaunch = require('chrome-launch'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const url = 'https://google.com';
const dev = path.resolve(__dirname, '..', 'dev');
const args = [`--load-extension=${dev}`];

chromeLaunch(url, { args });
console.log('A new instance of Chrome should now be open in the background.'); // eslint-disable-line no-console