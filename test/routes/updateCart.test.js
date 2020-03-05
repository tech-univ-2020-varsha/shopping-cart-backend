let { server } = require('../../server');

const init = async () => {
  await server.initialize();
  return server;
};


describe('the update cart', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });
  it('should return 400 bad request on invalid payload', async () => {
    const updateCart = {
      method: 'PUT',
      url: '/cart',
      payload: {
        name: {

        },
      },
    };
    const response = await server.inject(updateCart);
    expect(response.statusCode).toBe(400);
  });
});
