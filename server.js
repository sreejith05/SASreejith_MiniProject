const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Apply CORS middleware
server.use(cors());

// Set default middlewares
server.use(middlewares);

// Use router
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});


const allowedOrigins = ['http://localhost:4200']
server.use(cors({ origin: allowedOrigins }));