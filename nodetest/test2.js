var http = require("http");
var exec = require('child_process').exec;

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
 
   // Call CBMC
   exec('~/cbmc/src/cbmc/cbmc test.c --json-ui', function (error, stdout, stderr) {
     if (error.code!=0 && error.code!=10) {
       console.error(error);
       console.log(stderr);
       return;
     }
     console.log(stdout);
     // Send the response body as the output of cbmc
     data=JSON.parse(stdout);
     //console.log(data);
     output=JSON.stringify(data);
     response.end(output);
   });
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
