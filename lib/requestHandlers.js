var fs = require("fs"),
  formidable = require("formidable");

function start(response) {
  var body = '<html>' +
      '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
      '</head>' +
      '<body>' +
        '<form action="upload" enctype="multipart/form-data" method="post">' +
          '<input type="file" name="upload">' +
          '<input type="submit" value="Upload file" />' +
        '</form>' +
      '</body>' +
    '</html>';


    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  var form = new formidable.IncomingForm();

  form.parse(request, function(error, fields, files) {

    fs.rename(files.upload.path, "tmp/test.png", function(error){
      if (error) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "tmp/test.png");
      }
    });

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Received image:<br/> ");
    response.write("<img height='100%' width='500px' src='/show' />");
    response.end();
  });

}

function show(response) {
  response.writeHead(200, {"Content-Type": "image/png"});
  var stream = fs.createReadStream("tmp/test.png");

  stream.on('error', function (error) { console.log("Caught", error); });
  stream.once('readable', function () { stream.pipe(response); });
}

exports.start = start;
exports.upload = upload;
exports.show = show;