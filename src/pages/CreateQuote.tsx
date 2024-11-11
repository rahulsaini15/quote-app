// src/components/QuoteCreationPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { createQuote, uploadImage } from '../services/api';

const Container = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

interface QuoteCreationPageProps {
  token: string;
}

const QuoteCreationPage: React.FC<QuoteCreationPageProps> = ({ token }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("file", file);
  
        // Send POST request to upload image
        const uploadResponse = await fetch("https://crafto.app/crafto/v1.0/media/assignment/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }
  
        const uploadData = await uploadResponse.json();
        const mediaUrl = uploadData.mediaUrl; // Assuming mediaUrl is returned in the response
  
        // Now proceed to create the quote
        await createQuote(text, mediaUrl, token);
        alert("Quote created successfully");
      } catch (error) {
        console.error("Error creating quote:", error);
        alert("Error creating quote.");
      }
    }
  };
  

  return (
    <Container>
      <h2>Create Quote</h2>
      <Input
        type="text"
        placeholder="Enter quote text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleSubmit}>Submit Quote</Button>
    </Container>
  );
};

export default QuoteCreationPage;
