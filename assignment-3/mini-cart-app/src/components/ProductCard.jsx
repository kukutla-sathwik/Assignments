import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../features/cart/cartSlice';
import { openCart } from '../features/ui/uiSlice';

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.09);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Title = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
  min-height: 2.4em;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #16a34a;
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #6b7280;
  height: 3.6em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddButton = styled.button`
  margin-top: auto;
  border-radius: 999px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  background: ${(props) => (props.inCart ? '#e5e7eb' : '#2563eb')};
  color: ${(props) => (props.inCart ? '#111827' : '#f9fafb')};

  &:hover {
    background: ${(props) => (props.inCart ? '#d1d5db' : '#1d4ed8')};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const inCart = useSelector((state) =>
    state.cart.items.some((item) => item.id === product.id)
  );

  const handleClick = () => {
    if (!inCart) {
      dispatch(addToCart(product));
    }
    // Open the cart drawer whenever button clicked
    dispatch(openCart());
  };

  return (
    <Card>
      <ImageWrapper>
        {product.images && product.images.length > 0 ? (
          <Image src={product.images[0]} alt={product.title} />
        ) : (
          <span>No Image</span>
        )}
      </ImageWrapper>
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
      <AddButton onClick={handleClick} inCart={inCart}>
        {inCart ? 'In Cart ✓' : 'Add to Cart'}
      </AddButton>
    </Card>
  );
};

export default ProductCard;
