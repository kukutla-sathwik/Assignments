import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Brand = styled(NavLink)`
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
`;

const Nav = styled.nav`
  flex-grow: 1;
`;

const NavItem = styled(NavLink)`
  margin-right: 1rem;
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 0.15rem;
  border-bottom: 2px solid transparent;

  &.active {
    font-weight: 600;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SearchButton = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  }

  return (
    <Header>
      <Brand to="/">GitHub Radar</Brand>

      <Nav>
        <NavItem to="/" end>
          Home
        </NavItem>
      </Nav>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search repos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
    </Header>
  );
}

export default NavBar;
