import axios from "axios";

export const fetchProducts = async (search) => {
  const url = search
    ? `https://dummyjson.com/products/search?q=${search}`
    : "https://dummyjson.com/products";

  const res = await axios.get(url);
  return res.data.products;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(
    "https://dummyjson.com/products/add",
    product
  );
  return res.data;
};
