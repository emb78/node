var exec = require("child_process").exec;

function start(response) {
  var content = "empty";
  exec("ls -lah", function(error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
  return content;
}

function upload(response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;