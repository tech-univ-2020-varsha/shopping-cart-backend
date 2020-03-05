const ping = [
  {
    path: '/ping',
    method: 'GET',
    handler: (request, h) => h.response('pong'),
  },
];


module.exports = ping;
