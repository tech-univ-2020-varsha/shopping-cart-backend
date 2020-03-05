const { checkoutCart } = require('../../src/handler/checkOut');
const dbOperations = require('../../src/utils/dbOperations');

describe('the checkoutCart function', () => {
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
  it('should return success response and status code of 200 when product gets updated successfully', async () => {
    const mockGetCardData = jest.spyOn(dbOperations, 'getCartData');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    mockGetCardData.mockResolvedValue(mockCartData);
    const mockUpdateProductTable = jest.spyOn(dbOperations, 'updateProductTable');
    mockUpdateProductTable.mockResolvedValue();
    await checkoutCart(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith('product quantity updated');
    expect(mockCode).toHaveBeenCalledWith(200);
    expect(mockGetCardData).toHaveBeenCalledWith();
    expect(mockUpdateProductTable).toHaveBeenCalledWith(mockCartData);
    mockUpdateProductTable.mockRestore();
    mockGetCardData.mockRestore();
  });

  it("should return a failure message with status code 500 when data from cart couldn't be fetched", async () => {
    const mockGetCardData = jest.spyOn(dbOperations, 'getCartData');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    mockGetCardData.mockRejectedValue(new Error('Unable to fetch data'));

    await checkoutCart(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to fetch data');
    expect(mockCode).toHaveBeenCalledWith(500);
    expect(mockGetCardData).toHaveBeenCalledWith();
    mockGetCardData.mockRestore();
  });


  it("should return a failure message with status code 500 when quantity in product table couldn't be updated", async () => {
    const mockGetCardData = jest.spyOn(dbOperations, 'getCartData');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    mockGetCardData.mockResolvedValue(mockCartData);
    const mockUpdateProductTable = jest.spyOn(dbOperations, 'updateProductTable');
    mockUpdateProductTable.mockRejectedValue(new Error('Unable to update product details'));
    await checkoutCart(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to update product details');
    expect(mockCode).toHaveBeenCalledWith(500);
    expect(mockGetCardData).toHaveBeenCalledWith();
    mockGetCardData.mockRestore();
  });
});
