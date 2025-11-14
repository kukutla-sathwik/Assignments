import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeCart } from '../features/ui/uiSlice';
import { clearCart } from '../features/cart/cartSlice';
import CartItem from './CartItem';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 20;
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  max-width: 100%;
  height: 100%;
  background: #f9fafb;
  box-shadow: -4px 0 20px rgba(15, 23, 42, 0.25);
  transform: translateX(${(props) => (props.isOpen ? '0%' : '100%')});
  transition: transform 0.25s ease-out;
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;

const ItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

const ClearButton = styled.button`
  border-radius: 999px;
  padding: 8px 12px;
  border: 1px solid #ef4444;
  color: #ef4444;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #fee2e2;
  }
`;

const CheckoutButton = styled.button`
  border-radius: 999px;
  padding: 10px 12px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  background: #16a34a;
  color: #ecfdf3;
  transition: background 0.2s;

  &:hover {
    background: #15803d;
  }
`;

const EmptyMessage = styled.div`
  padding: 20px 0;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
`;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isCartOpen);
  const { items, totalPrice } = useSelector((state) => state.cart);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeCart());
    }
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={handleOverlayClick} />
      <Drawer isOpen={isOpen}>
        <Header>
          <Title>Your Cart</Title>
          <CloseButton onClick={() => dispatch(closeCart())}>×</CloseButton>
        </Header>

        <ItemsContainer>
          {items.length === 0 ? (
            <EmptyMessage>Your cart is empty.</EmptyMessage>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </ItemsContainer>

        <Footer>
          <TotalRow>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </TotalRow>
          <CheckoutButton disabled={items.length === 0}>
            Checkout (Demo)
          </CheckoutButton>
          {items.length > 0 && (
            <ClearButton onClick={() => dispatch(clearCart())}>
              Clear Cart
            </ClearButton>
          )}
        </Footer>
      </Drawer>
    </>
  );
};

export default CartDrawer;
