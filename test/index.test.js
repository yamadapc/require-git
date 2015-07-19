'use strict'; /* global describe, it, before */
var fs = require('fs');
var path = require('path');
var remove = require('remove');
var should = require('should');
var nrequire = require('..');

describe('nrequire', function() {
  describe('nrequire', function() {
    before(function(done) {
      var t = path.join(__dirname, '..', 'node_modules', 'written-number');
      fs.exists(t, function(e) {
        if(e) {
          return remove(t, done);
        }
        done();
      });
    });

    after(function(done) {
      var t = path.join(__dirname, '..', 'node_modules', 'written-number');
      remove(t, done);
    });

    it('gets exposed', function() {
      should.exist(nrequire);
      nrequire.should.be.instanceof(Function);
    });

    it('installs from a git repository and returns its module', function() {
      this.timeout(10000);
      var oldModules = fs.readdirSync(path.join(__dirname, '..', 'node_modules'));
      oldModules.should.not.containEql('written-number');
      nrequire('written-number')
      var newModules = fs.readdirSync(path.join(__dirname, '..', 'node_modules'));
      newModules.should.containEql('written-number');
    });
  });
});
