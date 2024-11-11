import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuotes } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const QuoteContainer = styled.div`
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuoteImage = styled.div<{ mediaUrl: string }>`
  position: relative;
  width: 20em;
  height: 19rem;
  background-image: url(${(props) => props.mediaUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
`;

const QuoteTextOverlay = styled.div`
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  font-size: 1.2em;
  text-align: center;
`;

const QuoteDetails = styled.div`
  padding: 10px;
  font-size: 0.9em;
  color: #666;
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 24px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

type Quote = {
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
};

type QuoteListPageProps = {
  token: string;
};

const QuoteListPage: React.FC<QuoteListPageProps> = ({ token }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadQuotes = async () => {
    try {
      const response = await getQuotes(20, offset, token);
      const quotesData = Array.isArray(response?.data?.data) ? response?.data?.data : [];
      
      if (quotesData.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...quotesData]);
        setOffset(offset + 20);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    setQuotes([]);
    setOffset(0);
    setHasMore(true);
    loadQuotes();
  }, [token]);

  return (
    <Container>
      <h2>Quotes</h2>
      {quotes.map((quote, index) => (
        <QuoteContainer key={quote.mediaUrl + index}>
          <QuoteImage mediaUrl={quote.mediaUrl}>
            <QuoteTextOverlay>{quote.text}</QuoteTextOverlay>
          </QuoteImage>
          <QuoteDetails>
            <p>Posted by: {quote.username}</p>
            <p>Created At: {new Date(quote.createdAt).toLocaleString()}</p>
          </QuoteDetails>
        </QuoteContainer>
      ))}
      {hasMore && (
        <LoadMoreButton onClick={loadQuotes}>Load More</LoadMoreButton>
      )}
      <FloatingActionButton onClick={() => navigate('/create-quote')}>+</FloatingActionButton>
    </Container>
  );
};

export default QuoteListPage;
