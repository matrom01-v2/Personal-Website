import * as http from "http";
import * as fsSync from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import  {fileURLToPath} from "url";
 
const host = "localhost";
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionToContentType = {
    html: "text/html",
    css: "text/css",
    jpg: "image/jpeg",
    mp4: "video/mp4"
}

function getContentType(extension) {
  switch (extension) {
    case "html": return "text/html";
    case "css": return "text/css";
  }
}

const add = (a, b) => a + b + 5; // example arrow func fun  **DEAD FUNCTION**

// use variables to handle incoming urls,  then hand it to readFile
const server = http.createServer((req, res) => {
  console.log({incoming_url: req.url});


  let myUrl = req.url;
  if (myUrl === '/') {
      myUrl = "/index.html";
  }

  // get extension and fetch corresponding content type from table
  const getExtension = myUrl.split('.').at(-1);
  const contentType = extensionToContentType[getExtension];

  // if content type is not accounted for, error
  if (!contentType) {
    // handle unknown contentType here
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  

  console.log({my_url_path: myUrl}); // see file path

  try {
      res.writeHead(200, {'Content-Type': contentType });
      let filePath = path.join(__dirname + myUrl);
      let readStream = fsSync.createReadStream(filePath);
      readStream.pipe(res);
    }
    catch(err) {
      console.error(err);
      res.writeHead(400);
      res.end("Bad Request");
      return;
    };
}); // end create server

server.listen(port, host, () => {
  console.log(`Server is running @ http://${host}:${port}`);
});
