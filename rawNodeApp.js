/*

Raw HTTP node.js app with no Framework, NPM, or package.json
The app will
  - import necessary modules
  - create a server instance
  - attach listener to the request even of the server object
  - Parse request body and headers
  - Send response to the client
  - handle errors events at request/response streams

*/

// include the http module
var http = require("http");

// create a server instance
var server = http.createServer();
server.on("request", (request, response) => {
  // gets called every time a request is made on our server
  var body = [];
  request.on("data", chunk => {
    // append data to body array
    body.push(chunk);
  });
  request.on("end", () => {
    // concat and stringify the array
    body = body.concat.toString();
    //'end' event is raised once per request,
  });
  request.on("error", () => {
      response.statusCode = 400;
      response.end();
    });
  response.on("error", err => {
    console.err(err);
  });
  response.write("Welcome to this raw node.js app!");
  // end allows us to close the http connection
  response.end();
});

// listen to all incoming requests at this port
server.listen(8008, () => {
  console.log("Server listening at 8008");
});

/*
to run the app at the command line...
$ node simpleApp.js
then hit the server with the following curl...
$ curl -d "Hello World” -H "Content-Type: text” -X POST

http://localhost:8008/
*/
