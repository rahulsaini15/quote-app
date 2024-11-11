// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginPage from './pages/LoginPage';
import QuoteListPage from './pages/QuoteListPage';
import QuoteCreationPage from './pages/CreateQuote';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (authToken: string) => {
    setToken(authToken);
  };

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/quotes" replace /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/quotes"
            element={token ? <QuoteListPage token={token} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/create-quote"
            element={token ? <QuoteCreationPage token={token} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/quotes" : "/login"} replace />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
