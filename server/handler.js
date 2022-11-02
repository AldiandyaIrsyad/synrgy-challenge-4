import fs from "fs";


function htmlHandler(req, res, filename) {
  fs.readFile(`./public/${filename}`, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });

}
export function rootHandler(req, res) {
  htmlHandler(req, res, "index.html");
}

export function search(req, res) {
  htmlHandler(req, res, "search.html");
}

export function genericHandler(req, res, path) {
  const supportedTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
  }

  const ext = path.substr(path.lastIndexOf("."));

  const contentType = supportedTypes[ext];

  if (!contentType) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
    return;
  }


  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}