const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/index');


const server = Hapi.Server({
  host: 'localhost',
  port: 8080,
  routes: {
    cors: true,
  },
});
server.route(routes);


module.exports = { server };
