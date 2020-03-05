const { getProducts } = require('../../src/handler/products');
const dbOperations = require('../../src/utils/dbOperations');
const externalApiFetch = require('../../src/utils/getProductsFromExternalApi');


describe('the getProducts function', () => {
  it('should obtain product details as response and status code of 200  when data present in db is fetched successfully', async () => {
    const mockGetProductsData = jest.spyOn(dbOperations, 'getProductsData');
    const mockProducts = [{
      id: 15,
      name: 'Aluminum foil - 9m',
      price: 71,
      quantity: 6,
      imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
      category: 'household',
      createdAt: '2020-03-05T06:07:45.765Z',
      updatedAt: '2020-03-05T06:07:45.765Z',
    }];
    mockGetProductsData.mockResolvedValue(mockProducts);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await getProducts(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockProducts);
    expect(mockCode).toHaveBeenCalledWith(200);
    expect(mockGetProductsData).toHaveBeenCalledWith();
    mockGetProductsData.mockRestore();
  });
  it('should obtain product details as response and status code of 200  when db was empty and data from external API is successfully inserted to db', async () => {
    const mockGetProductsData = jest.spyOn(dbOperations, 'getProductsData');
    const mockProducts = [];
    mockGetProductsData.mockResolvedValue(mockProducts);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const externalProducts = [{
      id: 15,
      name: 'Aluminum foil - 9m',
      price: 71,
      quantity: 6,
      imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
      category: 'household',
      createdAt: '2020-03-05T06:07:45.765Z',
      updatedAt: '2020-03-05T06:07:45.765Z',
    }];
    const mockGetProductsFromExternalApi = jest.spyOn(externalApiFetch, 'getProductsFromExternalApi');
    mockGetProductsFromExternalApi.mockResolvedValue(externalProducts);
    const mockInsertProducts = jest.spyOn(dbOperations, 'insertProducts');
    mockInsertProducts.mockResolvedValue(externalProducts);
    await getProducts(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith(externalProducts);
    expect(mockCode).toHaveBeenCalledWith(200);
    mockInsertProducts.mockRestore();
    mockGetProductsFromExternalApi.mockRestore();
  });


  it('should return a failure message with status code 500 when db fetch fails', async () => {
    const mockGetProductsData = jest.spyOn(dbOperations, 'getProductsData');

    mockGetProductsData.mockRejectedValue(new Error("products can't be fetched from db"));
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await getProducts(null, mockH);
    expect(mockGetProductsData).toHaveBeenCalledWith();
    expect(mockH.response).toHaveBeenCalledWith("products can't be fetched from db");
    expect(mockCode).toHaveBeenCalledWith(500);
    mockGetProductsData.mockRestore();
  });

  it('should return a failure message with status code 500 when fetch from externl api fails', async () => {
    const mockGetProductsData = jest.spyOn(dbOperations, 'getProductsData');
    const mockProducts = [];
    mockGetProductsData.mockResolvedValue(mockProducts);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const mockGetProductsFromExternalApi = jest.spyOn(externalApiFetch, 'getProductsFromExternalApi');
    mockGetProductsFromExternalApi.mockRejectedValue(new Error("products can't be fetched from external api"));
    await getProducts(null, mockH);
    expect(mockGetProductsData).toHaveBeenCalledWith();
    expect(mockH.response).toHaveBeenCalledWith("products can't be fetched from external api");
    expect(mockCode).toHaveBeenCalledWith(500);
    mockGetProductsData.mockRestore();
  });

  it('should return a failure message with status code 500 when insertion of products to db fails', async () => {
    const mockGetProductsData = jest.spyOn(dbOperations, 'getProductsData');
    const mockProducts = [];
    mockGetProductsData.mockResolvedValue(mockProducts);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const externalProducts = [{
      id: 15,
      name: 'Aluminum foil - 9m',
      price: 71,
      quantity: 6,
      imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
      category: 'household',
      createdAt: '2020-03-05T06:07:45.765Z',
      updatedAt: '2020-03-05T06:07:45.765Z',
    }];
    const mockGetProductsFromExternalApi = jest.spyOn(externalApiFetch, 'getProductsFromExternalApi');
    mockGetProductsFromExternalApi.mockResolvedValue(externalProducts); await getProducts(null, mockH);
    const mockInsertProducts = jest.spyOn(dbOperations, 'insertProducts');
    mockInsertProducts.mockRejectedValue(new Error('Unable to add products'));
    expect(mockGetProductsData).toHaveBeenCalledWith();
    expect(mockH.response).toHaveBeenCalledWith('Unable to add products');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockGetProductsData.mockRestore();
  });
});
