import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import RepoDetails from "./pages/RepoDetails";
import SearchRepos from "./pages/SearchRepos";

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
`;

function App() {
  return (
    <AppShell>
      <NavBar />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/repo/:owner/:repo" element={<RepoDetails />} />
          <Route path="/search" element={<SearchRepos />} />
        </Routes>
      </Main>
    </AppShell>
  );
}

export default App;
