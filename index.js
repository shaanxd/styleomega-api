const http = require('http');
const app = require('./app');
const connection = require('./api/database/connection');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    connection.authenticate()
        .then(() => {
            console.log(`Connection established successfully. Server is listening at port ${port}`)
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
);