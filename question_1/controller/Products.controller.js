const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const BASE_URL = 'http://20.244.56.144/test/companies';
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjA4NjE5LCJpYXQiOjE3MjA2MDgzMTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM1NjAxOGVmLWQ2MjAtNDdiOC1hMDcxLWEzNzNiZTY1ZmJjYiIsInN1YiI6ImthaWZhbGFtOTU4MEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJOZXdDb21wdCIsImNsaWVudElEIjoiYzU2MDE4ZWYtZDYyMC00N2I4LWEwNzEtYTM3M2JlNjVmYmNiIiwiY2xpZW50U2VjcmV0Ijoid1BGT3ZUaW9FdHlKWnhXdyIsIm93bmVyTmFtZSI6IkthaWYgYWxhbSIsIm93bmVyRW1haWwiOiJrYWlmYWxhbTk1ODBAZ21haWwuY29tIiwicm9sbE5vIjoiMjI5MTUyIn0.u-6uxxxTKWAdT91oFJDalOCC2aZUjIPjpCChdwBNgjw"

const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
  const url = `${BASE_URL}/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const { data } = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
  });
  return data.map(product => ({ ...product, id: uuidv4(), company }));
};

const getProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { top = 10, page = 1, minPrice = 0, maxPrice = Infinity, sort = '' } = req.query;
  const allProducts = (await Promise.all(COMPANIES.map(company =>
    fetchProducts(company, categoryname, top, minPrice, maxPrice)
  ))).flat();

  let sortedProducts = allProducts;
  if (sort) {
    const [key, order] = sort.split(',');
    sortedProducts = allProducts.sort((a, b) => order === 'desc' ? b[key] - a[key] : a[key] - b[key]);
  }

  const start = (page - 1) * top;
  res.json(sortedProducts.slice(start, start + parseInt(top, 10)));
};

const getProductById = async (req, res) => {
  const { categoryname, productid } = req.params;
  const { top = 10, minPrice = 0, maxPrice = Infinity } = req.query;

  try {
    const products = [];
    for (const company of COMPANIES) {
      const companyProducts = await fetchProducts(company, categoryname, top, minPrice, maxPrice);
      companyProducts.forEach(product => {
        product.id = uuidv4();
        product.company = company;
        products.push(product);
      });
    }

    const product = products.find(p => p.id === productid);
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getProducts, getProductById };
