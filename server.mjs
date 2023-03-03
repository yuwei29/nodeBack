import * as http from 'http';
import * as bone from './bone.mjs'
import * as querystring from 'querystring'
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.method)
    if (req.url == '/') {
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.end('mainPage')
    } else if (req.url == '/article' && req.method == 'POST') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        let str = '';
        req.on('data', data => {
            str += data;
        })
        req.on('end', () => {
            let userdata = querystring.parse(str)
            // console.log(userdata.title);
            let article = bone.book.get(userdata.title)
            // console.log(article);
            res.end(article)
        })
        // res.end('from server')
    } else if (req.url == '/addArticle' && req.method == 'POST') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end('got user data')
        let str = '';
        req.on('data', data => {
            str += data;
        })
        req.on('end', () => {
            let userdata = querystring.parse(str)
            if (bone.isAdmin(userdata.username, userdata.password)) {
                bone.addArticle(userdata.title, userdata.article)
            }
        })
    } else if (req.url == '/list') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(bone.bookToc))
    }
});

server.listen(5757)
