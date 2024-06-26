import styled from "styled-components";
import { Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #E9F2F1;
  height: 100vh;
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditButton = styled(Button)`
  margin-left: auto;
`;

export const InfoContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .MuiButton-root {
    width: 100%;
    background-color: #4CAF50;
  }
`;
