import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice';

const Row = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 8px;
  background: #e5e7eb;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 0.85rem;
  color: #16a34a;
`;

const QuantityControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
`;

const QtyButton = styled.button`
  border-radius: 999px;
  width: 22px;
  height: 22px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: #ef4444;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 4px;
`;

const Subtotal = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: right;
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Row>
      <Image src={item.image} alt={item.title} />
      <Info>
        <Title>{item.title}</Title>
        <Price>${item.price}</Price>
        <QuantityControls>
          <QtyButton onClick={() => dispatch(decreaseQuantity(item.id))}>
            −
          </QtyButton>
          <span>{item.quantity}</span>
          <QtyButton onClick={() => dispatch(increaseQuantity(item.id))}>
            +
          </QtyButton>
        </QuantityControls>
        <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </RemoveButton>
      </Info>
      <Subtotal>${(item.price * item.quantity).toFixed(2)}</Subtotal>
    </Row>
  );
};

export default CartItem;
