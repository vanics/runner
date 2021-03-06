#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
/* eslint no-sync:0 no-console:0 */

var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug']
});

if (args.debug) {
  process.env.DEBUG = 'mongodb-runner*';
}

var run = require('../');
var pkg = require('../package.json');
var clui = require('clui');
var debug = require('debug')('mongodb-runner:bin');

args.action = args.action || args._[0] || 'start';

if (args.help || args.h) {
  console.error(usage);
  process.exit(1);
}
if (args.version) {
  console.error(pkg.version);
  process.exit(1);
}

debug('running action `%s`', args.action);

if (args.action === 'start' && !process.env.CI) {
  new clui.Spinner('Starting a MongoDB deployment to test against...').start();
}

run(args, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  debug('ran action `%s` successfully', args.action);
  process.exit(0);
});
