#!/usr/bin/env node

var fs = require('fs')
  , program = require('commander');

// set up command line syntax
program
  .version('0.0.2')
  .usage('[options]')
  .option('-v, --verbose', 'output extra details')
  .option('-p, --path [dir]', 'OneDrive directory (defaults to %UserProfile%\\SkyDrive)');

program.on('--help', function() {
  console.log('  So What\'s This Thing Do:\n');
  console.log('    Run this script to list potentially suspicious paths in your OneDrive.\n');
  console.log('    What makes a path suspicious? Int\'l chars such as Æ are known to cause');
  console.log('    OneDrive "Checking for changes..." loops in Windows 8.1. You may wish to');
  console.log('    rename any paths this script warns you about.');
});

program.parse(process.argv);

// use a non-default path if given
var rootPath = program.path
  ? program.path
  : process.env.USERPROFILE + '\\SkyDrive';

// first attempt to resolve the path
fs.realpath(rootPath, recursePathContents);

// then iterate over directory contents, outputting any suspicious paths
function recursePathContents(err, dir) {
  if (err) {
    console.log('\n  error: couldn\'t access path `%s\'', err.path);
    return; // stops if the path didn't resolve correctly
  }
  if (program.verbose) console.log('Looking in: %s', dir);

  fs.readdirSync(dir) // retrieves all files & folders in the directory
    .forEach(function(item) {
      var itemPath = dir + '\\' + item;
      fs.lstat(itemPath, function(err, stats) {
        if (err) return; // dehydrated OneDrive files will error in lstat(), so swallow them
        if (stats.isDirectory()) { // only recurse into directories
          if (isPathSuspicious(item)) {        
            console.log('\x1b[33m%s\x1b[0m', itemPath); // warn with yellow color
          }
          recursePathContents(err, itemPath);
        }
      });
    });
}

// use a regex to check for uncommon characters in a path
function isPathSuspicious(dir) {
  var pathRegex = /^([A-z]\:)?[\w\d\s\.\\\{\}\(\)\[\]\+\-\';,!@#\$%^&~=]+$/;
  if (dir.search(pathRegex) === -1) return true;
  else {
    if (dir.length >= 255) return true;
    return false;
  }
}
