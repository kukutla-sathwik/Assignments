import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { toggleCart } from '../features/ui/uiSlice';

const bounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.2); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const HeaderBar = styled.header`
  background: #111827;
  color: #f9fafb;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Brand = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;

const CartButton = styled.button`
  background: #2563eb;
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f9fafb;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Badge = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  background: #fbbf24;
  color: #111827;
  font-weight: 700;
  animation: ${bounce} 0.3s;
`;

const Header = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <HeaderBar>
      <Brand>Mini Cart Store</Brand>
      <CartButton onClick={() => dispatch(toggleCart())}>
        <span>Cart</span>
        <Badge>{totalQuantity}</Badge>
      </CartButton>
    </HeaderBar>
  );
};

export default Header;
