import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px 40px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const Message = styled.div`
  padding: 40px 0;
  text-align: center;
  font-size: 1rem;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Wrapper>
        <Message>Loading products...</Message>
      </Wrapper>
    );
  }

  if (status === 'failed') {
    return (
      <Wrapper>
        <Message>Error: {error}</Message>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Products</Title>
      <Grid>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductList;
