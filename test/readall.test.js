/**!
 * co-readall - test/readall.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var co = require('co');
var fs = require('fs');
var readall = require('../');

describe('co-readall.test.js', function () {
  it('should read file stream', co(function *() {
    var data = yield readall(fs.createReadStream(__filename));
    data.should.length(fs.statSync(__filename).size);
  }));

  it('should pipe file stream', co(function *() {
    var data = yield readall(fs.createReadStream(__filename), fs.createWriteStream(__filename + '.out'));
    should.not.exist(data);
    fs.statSync(__filename + '.out').size.should.equal(fs.statSync(__filename).size);
  }));
});
