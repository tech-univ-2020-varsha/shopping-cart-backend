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


describe('the getCart operation', () => {
  const cartsdb = shoppingCartSequelize.cart;

  it('should get all products details on success', async () => {
    const mockFindAll = jest.spyOn(cartsdb, 'findAll');
    mockFindAll.mockResolvedValue();
    await dbOperations.getCartData();
    expect(mockFindAll).toHaveBeenCalledWith({ raw: true });
  });

  it('should return error message when all products cant be retrived', async () => {
    try {
      const mockFindAll = jest.spyOn(cartsdb, 'findAll');
      mockFindAll.mockRejectedValue(new Error('Unable to get cart details'));
      await dbOperations.getCartData();
      expect(mockFindAll).toHaveBeenCalledWith({ raw: true });
    } catch (err) {
      expect(err.message).toBe('Unable to get cart details');
    }
  });
});

describe('the update products operation', () => {
  const cartsdb = shoppingCartSequelize.cart;
  const productsdb = shoppingCartSequelize.products;
  const mockCartDetails = [
    {
      id: 1,
      name: 'Apple - 1kg',
      price: 210,
      quantity: 2,
      imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
      category: 'fruits',
      total: 420,
      createdAt: '2020-03-05T09:24:50.916Z',
      updatedAt: '2020-03-05T09:24:50.916Z',
    },
  ];
  it('should update the quantity of product on success', async () => {
    const mockDestroy = jest.spyOn(cartsdb, 'destroy');
    mockDestroy.mockResolvedValue();
    const destroyArgs = { truncate: true };
    const mockDecrement = jest.spyOn(productsdb, 'decrement');
    mockDecrement.mockResolvedValue();
    await dbOperations.updateProductTable(mockCartDetails);
    expect(mockDestroy).toHaveBeenCalledWith(destroyArgs);

    mockCartDetails.map((cart) => {
      expect(mockDecrement).toHaveBeenCalledWith('quantity', {
        by: cart.quantity,
        where: {
          id: cart.id,
        },
        returning: true, // to get updated data back
      });
    });
  });


  it('should return an failure messgage when deleting all cart product fails', async () => {
    try {
      const mockDestroy = jest.spyOn(cartsdb, 'destroy');
      mockDestroy.mockRejectedValue(new Error('Unable to update product details'));
      await dbOperations.updateProductTable(mockCartDetails);
    } catch (err) {
      expect(err.message).toBe('Unable to update product details');
    }
  });

  it('should return an failure messgage when updating the product table fails', async () => {
    try {
      const mockDestroy = jest.spyOn(cartsdb, 'destroy');
      mockDestroy.mockResolvedValue();
      const mockDecrement = jest.spyOn(productsdb, 'decrement');
      mockDecrement.mockRejectedValue(new Error('Unable to update product details'));
      await dbOperations.updateProductTable(mockCartDetails);
    } catch (err) {
      expect(err.message).toBe('Unable to update product details');
    }
  });
});


describe('the  delete products from db function', () => {
  it('should delete the cart item on success', async () => {
    const mockId = 1;
    const destroyArgs = {
      where: {
        id: mockId,
      },
    };

    const cartsdb = shoppingCartSequelize.cart;
    const mockDestroy = jest.spyOn(cartsdb, 'destroy');
    mockDestroy.mockResolvedValue();
    await dbOperations.deleteProductFromCart(mockId);
    expect(mockDestroy).toHaveBeenCalledWith(destroyArgs);
    mockDestroy.mockRestore();
  });

  it('should return the error the cart item couldnt be deleted', async () => {
    const mockId = 1;
    const destroyArgs = {
      where: {
        id: mockId,
      },
    };

    const cartsdb = shoppingCartSequelize.cart;
    const mockDestroy = jest.spyOn(cartsdb, 'destroy');
    mockDestroy.mockRejectedValue(new Error('Unable to delete the cart item'));
    try {
      await dbOperations.deleteProductFromCart(mockId);
    } catch (err) {
      expect(err.message).toBe('Unable to delete the cart item');
    }
    mockDestroy.mockRestore();
  });
});
