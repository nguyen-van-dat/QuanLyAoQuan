const http = require('http');
const app = require('../index');
const PORT = 2006;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});