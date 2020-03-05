const axios = require('axios');

const PRODUCTS_URL = 'http://ec2-54-157-238-134.compute-1.amazonaws.com:8080/products';

const getProductsFromExternalApi = async () => {
  const result = await axios.get(PRODUCTS_URL);
  const productsArray = result.data;
  const newProducts = [];
  await Promise.all(productsArray.map(async (product) => {
    const updateProduct = product;
    const prodId = product.id;
    const categoryResult = await axios.get(`${PRODUCTS_URL}/${prodId}/category`);
    updateProduct.category = categoryResult.data.category;
    newProducts.push(updateProduct);
  }));
  return newProducts;
};

module.exports = { getProductsFromExternalApi };
