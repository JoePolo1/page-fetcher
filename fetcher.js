/** 
 * 
 * It should take two command line arguments:
 * a URL
 * a local file path
 * 
 * That looks like this:
 * > node fetcher.js http://www.example.edu/ ./index.html
 * 
 * It should download the resource at the URL to the local path on your machine. 
 * Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
 * 
 * OUTPUT in NODE: "Downloaded and saved 3261 bytes to ./index.html"
 */

// since this uses "request", we can require request here at the top of our code
const request = require('request');
const fs = require('fs');

// This takes command line arguments meaning we need to implement **PROCESS ARGV** into the solution
const URL = process.argv[2];
const filePath = process.argv[3];

//the request function can be nested in the CLI function as well
request(URL, (error, response, body) => {
  //it may also be important to store our findings in a single variable. we can check character length per byte to return total data later
  let combinedFindings = error + response + body;

  // "take the data you receive and write it to a file in your local filesystem.""
  // in order to write to filesystem, we need to use fs.writeFile
  fs.writeFile(filePath, combinedFindings, (err) => { // Create text file
    if (err) {
      console.log(err);
    } else {
      fs.readFile(filePath, 'utf8', (error, data) => {
        if (!error) {
          //returning final reply including byte size and path variable
          console.log(`Downloaded and saved ${combinedFindings.length} bytes to ${filePath}`);
        }
      })
    }
  });
});



