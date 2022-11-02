// simple http server
import http from 'http';
import * as handler from './handler.js';


const routes = {
    '/': {
        'GET': handler.rootHandler,
    },
    '/search': {
        'GET': handler.search,
    },
}

const router = (req, res) => {
    const url = req.url;
    const method = req.method;
    const route = routes[url];

    if (!route) {
        handler.genericHandler(req, res, `./public/${url}`);
        return;
    }

    const urlHandler = route[method];
    
    if (!urlHandler) {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('405 Method Not Allowed');
        return;
    }

    urlHandler(req, res);


}

const server = http.createServer(router);

server.listen(3000, () => {
    console.log('Staring server on http://127.0.0.1:3000');
});