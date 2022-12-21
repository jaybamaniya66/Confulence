 **Scope** 

This page gives information and configures of the Nodejs environment with Prometheus within the FulcrumSaaS ecosystem in DigitalOcean manually on the terminal.

 **Introduction** 


* Nodejs - is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser. 


* For Scrape Nodejs we need Prom-Client and it's the most popular Prometheus client library for Node.



 **Configuration** 

Step 1: Make Sure that prom-client is installed on the Server if not then we have to install it.


```
npm install prom-client
```
Step 2: Exposing default metrics.


```
const http = require('http')
const url = require('url')
const client = require('prom-client')
// Create a Registry which registers the metrics
const register = new client.Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'example-nodejs-app'
})
// Enable the collection of default metrics
client.collectDefaultMetrics({ register })
// Define the HTTP server
const server = http.createServer(async (req, res) => {
  // Retrieve route from request object
  const route = url.parse(req.url).pathname
  if (route === '/metrics') {
    // Return all metrics the Prometheus exposition format
    res.setHeader('Content-Type', register.contentType)
    res.end(await register.metrics())
  }
})
// Start the HTTP server which exposes the metrics on http://localhost:8080/metrics
server.listen(8080)
```
Step 3: Start the Node HTTP server or We can install PM2 that runs the server in the background and also configured it will restart the service.


```
node server.js
```
Step 4: We can get metrics from the localhost or Public IP at the port we configure.

example=http://localhost:8080/metrics





*****

[[category.storage-team]] 
[[category.confluence]] 
