require('should');

var requestHandlers = require('../lib/requestHandlers');

describe("start", function() {
  it("should be able to call start", function() {
    var response = { writeHead: function(){}, write: function(){}, end: function(){} };
    requestHandlers.start(response);
  });
});