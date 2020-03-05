const dbOperations = require('../../src/utils/dbOperations');
const shoppingCartSequelize = require('../../models/index');

describe('the insertProducts operation', () => {
  const mockProducts = [{
    id: 16,
    name: 'Aluminum foil - 9m',
    price: 71,
    quantity: 12,
    imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
    category: 'household',
  }];
  const productsdb = shoppingCartSequelize.products;
  it('should insert data to products table on success', async () => {
    const mockCreate = jest.spyOn(productsdb, 'bulkCreate');
    mockCreate.mockResolvedValue();
    await dbOperations.insertProducts(mockProducts);
    expect(mockCreate).toHaveBeenCalledWith(mockProducts);
  });
  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(productsdb, 'bulkCreate');

    try {
      mockCreate.mockRejectedValue(new Error('Unable to add products'));
      await dbOperations.insertProducts(mockProducts);
    } catch (err) {
      expect(err.message).toBe('Unable to add products');
    }
  });
});

describe('the getProductsData operation', () => {
  const productsdb = shoppingCartSequelize.products;

  it('should get all products details on success', async () => {
    const mockFindAll = jest.spyOn(productsdb, 'findAll');
    mockFindAll.mockResolvedValue();
    await dbOperations.getProductsData();
    expect(mockFindAll).toHaveBeenCalledWith();
  });

  it('should return error message when all products cant be retrived', async () => {
    try {
      const mockFindAll = jest.spyOn(productsdb, 'findAll');

      mockFindAll.mockRejectedValue(new Error('Unable to get products'));
      await dbOperations.getProductsData();
      expect(mockFindAll).toHaveBeenCalledWith();
    } catch (err) {
      expect(err.message).toBe('Unable to get products');
    }
  });
});


describe('the updateCart operation', () => {
  const mockCartProducts = [{
    id: 16,
    name: 'Aluminum foil - 9m',
    price: 71,
    quantity: 10,
    imageLink: 'https://techunic-eval4.s3.amazonaws.com/aluminumfoil.jpg',
    category: 'household',
    total: 710,
  }];
  const cartsdb = shoppingCartSequelize.cart;
  it('should insert data to carts table on success', async () => {
    const dbCondition = {
      fields: ['id', 'name', 'price', 'quantity', 'imageLink', 'category', 'total'],
      updateOnDuplicate: ['id', 'quantity', 'total'],
    };
    const mockCreate = jest.spyOn(cartsdb, 'bulkCreate');
    mockCreate.mockResolvedValue();
    await dbOperations.updateCart(mockCartProducts);

    expect(mockCreate).toHaveBeenCalledWith(mockCartProducts, dbCondition);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(cartsdb, 'bulkCreate');
    try {
      mockCreate.mockRejectedValue(new Error('Unable to update cart'));
      await dbOperations.updateCart(mockCartProducts);
    } catch (err) {
      expect(err.message).toBe('Unable to update cart');
    }
  });
});
