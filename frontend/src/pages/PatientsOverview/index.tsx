import {
  Typography,
  Button,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import { NavHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import { EditIcon, PhoneIcon } from "lucide-react";
import styled from "styled-components";

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #E9F2F1;
  height: 100vh;
`;

const ContentBox = styled(Box)`
  background: white;
  padding: 1rem;
  width: 80%;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AvatarContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LargeBox = styled(Box)`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;


export const PatientsOverview = () => {
  const navigate = useNavigate();
  const patientInfo = "Aqui estão as informações do paciente";

  return (
    <>
      <NavHeader />
      <MainContainer>
        <ContentBox>
          <HeaderContainer>
            <AvatarContainer>
              <Typography variant="h6">Nome do Paciente</Typography>
              <Typography variant="body2">
                <PhoneIcon fontSize="small" /> (35) 94002-8922 | CPF: 123.456.789-10
              </Typography>
            </AvatarContainer>
            <DetailsContainer>
              <Typography variant="body2">Endereço: </Typography>
              <Typography variant="body2">Cidade: </Typography>
              <Typography variant="body2">AC: </Typography>
              <Typography variant="body2">Nº AT: </Typography>
              <Typography variant="body2">Bairro: </Typography>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </DetailsContainer>
          </HeaderContainer>
          <LargeBox>
            <Typography variant="body1">{patientInfo}</Typography>
          </LargeBox>
          <ButtonContainer>
            <Button variant="contained" color="success" onClick={() => navigate("/Patients")}>
              Confirmar
            </Button>
          </ButtonContainer>
        </ContentBox>
      </MainContainer>
    </>
  );
};

