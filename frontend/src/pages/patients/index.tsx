import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Container, FiltersContainer, SearchContainer, PatientsContainer, PatientCard } from "./style";
import { NavHeader } from "../../components";
import { useNavigate } from "react-router-dom";

export const Patients = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavHeader />
      <Container id="CreatePatients">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FiltersContainer>
              <Typography variant="h6">Filtros</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Select" />
                <FormControlLabel control={<Checkbox />} label="Select" />
                <FormControlLabel control={<Checkbox />} label="Select" />
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Selected" />
                <FormControlLabel control={<Checkbox />} label="Selected" />
              </FormGroup>
              <TextField
                label="Valor filtro"
                name="valueFilter"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" fullWidth>Aplicar</Button>
            </FiltersContainer>
          </Grid>
          <Grid item xs={12} md={8}>
            <SearchContainer>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" width="100%">
                <Typography variant="body1">Pesquisar Paciente</Typography>
                <FormControl variant="outlined" margin="normal" sx={{ minWidth: 200, flex: 1 }}>
                  <InputLabel>Nomes...</InputLabel>
                  <Select size="small" label="Nomes...">
                    <MenuItem value=""><em>Nenhum</em></MenuItem>
                    <MenuItem value={10}>Pedro</MenuItem>
                    <MenuItem value={20}>Gabriel</MenuItem>
                    <MenuItem value={30}>Joãozinho</MenuItem>
                  </Select>
                </FormControl>
                <Button className="add-button" variant="contained" size="medium" onClick={() => navigate("/CreatePatients")}>Adicionar +</Button>
              </Box>
            </SearchContainer>
            <PatientsContainer>
              {[1, 2, 3].map((item, index) => (
                <PatientCard key={index}>
                  <Box display="flex" alignItems="center" width="100%" flexWrap="wrap" gap={2}>
                    <Box className="patient-avatar">
                      <Typography variant="h5">P</Typography>
                    </Box>
                    <Box ml={2} flex={1}>
                      <Typography variant="body1"><b>Nome do Paciente</b></Typography>
                      <Typography variant="body2">📞 (35) 94002-8922 | CPF: 123.456.789-10</Typography>
                      <Typography variant="body2" color="error">⚠️ CONTATO DE EMERGÊNCIA</Typography>
                    </Box>
                  </Box>
                  <Box className="buttons">
                    <Box>
                      <Typography variant="body1"><b>Responsável</b></Typography>
                      <Typography variant="body2">📞 (35) 94002-8922 | CPF: 123.456.789-10</Typography>
                    </Box>
                    <Box display="flex" gap={1} flexWrap="wrap" width="100%">
                      <Button className="edit-button" variant="outlined" size="small">Editar ✏️</Button>
                      <Button className="overview-button" variant="contained" size="small">Visão Geral</Button>
                    </Box>
                  </Box>
                </PatientCard>
              ))}
            </PatientsContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
