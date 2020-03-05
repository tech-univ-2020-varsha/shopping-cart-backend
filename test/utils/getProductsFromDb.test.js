const axios = require('axios');
const { getProductsFromExternalApi } = require('../../src/utils/getProductsFromExternalApi');

describe('the getProductsFromExternalApi function', () => {
  it('should return an array', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({ data: [] });
    const result = await getProductsFromExternalApi();
    expect(result).toBeInstanceOf(Array);
  });

  it('should make an axios call to get the data', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({ data: [] });
    await getProductsFromExternalApi();
    expect(mockAxios).toHaveBeenCalled();
  });
});
