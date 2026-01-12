import axios from "axios";

export const fetchProducts = async ({
  search,
  categories,
  startDate,
  endDate,
}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  if (categories && categories.length > 0) {
    categories.forEach((c) => params.append("categories", c));
  }

  const res = await axios.get(
    `http://localhost:8080/products/getProducts?${params.toString()}`
  );

  return res.data;
};



export const fetchProductById = async (id) => {
  const res = await axios.get(`http://localhost:8080/products/getProduct/${id}`);
  console.log(res)
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(
    `http://localhost:8080/product/add`,
    product
  );
  console.log(res)
  return "hello";
};
