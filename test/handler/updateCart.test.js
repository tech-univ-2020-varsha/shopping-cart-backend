const { updateCartDetails } = require('../../src/handler/updateCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the update cart details handler', () => {
  it('should obtain updated cart details as response and status code of 200  when cart table is updated succesfully', async () => {
    const mockRequest = {
      payload: {
        products: [
          {
            id: 16,
            name: 'Aluminum foil - 9m',
            price: 71,
            quantity: 10,
            imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
            category: 'household',

          },
        ],
      },
    };
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const updateProducts = [
      {
        id: 16,
        name: 'Aluminum foil - 9m',
        price: 71,
        quantity: 10,
        imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
        category: 'household',
        total: 710,
      },
    ];
    const mockUpdateCart = jest.spyOn(dbOperations, 'updateCart');
    mockUpdateCart.mockResolvedValue(updateProducts);
    await updateCartDetails(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(updateProducts);
    expect(mockCode).toHaveBeenCalledWith(200);
    expect(mockUpdateCart).toHaveBeenCalledWith(updateProducts);
    mockUpdateCart.mockRestore();
  });

  it('should return a failure message with status code 500 when update to cart db fails', async () => {
    const mockRequest = {
      payload: {
        products: [
          {
            id: 16,
            name: 'Aluminum foil - 9m',
            price: 71,
            quantity: 10,
            imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
            category: 'household',

          },
        ],
      },
    };
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const updateProducts = [
      {
        id: 16,
        name: 'Aluminum foil - 9m',
        price: 71,
        quantity: 10,
        imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
        category: 'household',
        total: 710,
      },
    ];
    const mockUpdateCart = jest.spyOn(dbOperations, 'updateCart');
    mockUpdateCart.mockRejectedValue(new Error('Unable to update cart'));
    await updateCartDetails(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to update cart');
    expect(mockCode).toHaveBeenCalledWith(500);
    expect(mockUpdateCart).toHaveBeenCalledWith(updateProducts);
    mockUpdateCart.mockRestore();
  });
});
