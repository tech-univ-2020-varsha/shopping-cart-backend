const { getCartDetails } = require('../../src/handler/getCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the getCartDetails function', () => {
  const mockCartData = [{
    id: 16,
    name: 'Aluminum foil - 9m',
    price: 71,
    quantity: 12,
    imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
    total: 852,
    category: 'household',
    createdAt: '2020-03-05T07:34:38.527Z',
    updatedAt: '2020-03-05T07:34:38.527Z',
  }];
  it('should return the cart details as response and status code of 200 on success', async () => {
    const mockGetCardData = jest.spyOn(dbOperations, 'getCartData');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    mockGetCardData.mockResolvedValue(mockCartData);

    await getCartDetails(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockCartData);
    expect(mockCode).toHaveBeenCalledWith(200);
    expect(mockGetCardData).toHaveBeenCalledWith();
    mockGetCardData.mockRestore();
  });

  it("should return a failure message with status code 500 when data from cart couldn't be fetched", async () => {
    const mockGetCardData = jest.spyOn(dbOperations, 'getCartData');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    mockGetCardData.mockRejectedValue(new Error('Unable to fetch data'));

    await getCartDetails(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to fetch data');
    expect(mockCode).toHaveBeenCalledWith(500);
    expect(mockGetCardData).toHaveBeenCalledWith();
    mockGetCardData.mockRestore();
  });
});
