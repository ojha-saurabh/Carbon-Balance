require('dotenv').config();
const app = require('./app');
const http = require('http');

process.env['TZ'] = 'UTC';
process.env['NODE_ENV'] = 'local';

const port = process.env.PORT || '8081';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Node app is running at http://localhost:${port}`);
})