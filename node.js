var http = require('http');
var request = require("request");
var cheerio = require("cheerio");

var server = http.createServer(function (req, res) {
  var requrl = req.url
console.log(requrl)
console.log(req.method)
//  var reqQuery = url.parse(requrl, true).query;
  var query = requrl;
  var headers = req.headers;
  var method = req.method;
  var url = req.url;
  console.log(url)
  var color = url.substring(url.indexOf('?'))
  console.log(color)
  var color = color.substring(1, color.indexOf('&'))
  console.log(color)
  // var body = [];
  // req.on('error', function(err) {
  //   console.error(err);
  // }).on('data', function(chunk) {
  //   body.push(chunk);
  // }).on('end', function() {
  //   body = Buffer.concat(body).toString();
  //   console.log(body)
  //   // At this point, we have the headers, method, url and body, and can now
  //   // do whatever we need to in order to respond to this request.
  // });

if(color=== 'undefined'){
  console.log('NO COLOR')
    request({
    uri: "http://www.color-hex.com/",
  }, function(error, response, body) {
    if (error) {console.log(error)};
    var eee = cheerio.load(body);
    var colorPick = [];

    eee(".colordvcon").each(function() {
      var link = eee(this);
      //console.log(link +" The link is")
      var text = link.text();
      //console.log(text);
      colorPick.push(text);
    //console.log(colorPick.length);
    });
    console.log(colorPick);
    res.end(''+ colorPick);
  });
  }else{

  request({
    uri: "http://www.color-hex.com/color/"+color,
  }, function(error, response, body) {
    if (error) {console.log(error)};
    var $ = cheerio.load(body);
    var colorPick = [];

  // var colorPick =  $(".colordvconline").attr('title')

$("a",".colordvconline").each(function() {
      var link = $(this);
      //console.log(link +" The link is")
      var text = link.text();
      //console.log(text);
      colorPick.push(text);
    //console.log(colorPick.length);
    });
    console.log(colorPick);
    res.end(''+colorPick);
  });
}


    console.log('request received');
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': 'http://localhost',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
})
server.listen(8080);

console.log('Hellow');