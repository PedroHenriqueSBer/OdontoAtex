import { Grid, TextField, Typography,Box, Button } from "@mui/material";
import { Container, Content } from "./style";
import { NavHeader } from "../../components";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import { ICreatePatientInputModel } from "inputModels";
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientController } from "../../controllers";
import { useLoading } from "../../context";



export const CreatePatients = () => {
  const {setIsLoading} = useLoading()
  const schema = yup.object<ICreatePatientInputModel>().shape({
    name: yup.string().required("Campo necessário!"),
    profession: yup.string().required("Campo necessário!"),
    cpf: yup.string().required("Campo necessário!"),
    rg: yup.string().required("Campo necessário!"),
    father: yup.string(),
    mother: yup.string(),
    phone: yup.string().required("Campo necessário!"),
    regionalHealthCard: yup.string().required("Campo necessário!"),
    nationalHealthCard: yup.string().required("Campo necessário!"),
    dateOfBirth: yup.string().required("Campo necessário!"),
    placeOfBirth: yup.string().required("Campo necessário!"),
    state: yup.string().required("Campo necessário!"),
    address: yup.string().required("Campo necessário!"),
    number: yup.string().required("Campo necessário!"),
    neighborhood: yup.string().required("Campo necessário!"),
    city: yup.string().required("Campo necessário!"),
    zipCode: yup.string().required("Campo necessário!")
  })
  const [defaultValues] = useState<ICreatePatientInputModel>({
    name: "",
    profession: "",
    cpf: "",
    rg: "",
    father: "",
    mother: "",
    phone: "",
    regionalHealthCard: "",
    nationalHealthCard: "",
    dateOfBirth: "",
    placeOfBirth: "",
    state: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    zipCode: ""
  });
  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })
  
  console.log(errors)

  const onSubmit = (input:ICreatePatientInputModel) => {
    setIsLoading(true)
    patientController.create(input).then(console.log).finally(() => setIsLoading(false))
  }
  return (
    <>
      <NavHeader />
      <Container id="patientPage">
        <div className="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Content>
                <Typography component='h1' variant="h5" color='primary' gutterBottom>
                  Dados Pessoais do Paciente
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="name"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Nome:" 
                          {...field}
                          error={!!errors.name?.message}
                          helperText={errors.name?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Data de Nascimento:" 
                          {...field}
                          error={!!errors.dateOfBirth?.message}
                          helperText={errors.dateOfBirth?.message}
                        />
                        }
                      />
                       </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="placeOfBirth"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Naturalidade:" 
                          {...field}
                          error={!!errors.placeOfBirth?.message}
                          helperText={errors.placeOfBirth?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="profession"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Profisssão:" 
                          {...field}
                          error={!!errors.profession?.message}
                          helperText={errors.profession?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="cpf"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="CPF:" 
                          {...field}
                          error={!!errors.cpf?.message}
                          helperText={errors.cpf?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="rg"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="RG:" 
                          {...field}
                          error={!!errors.rg?.message}
                          helperText={errors.rg?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="nationalHealthCard"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Naturalidade:" 
                          {...field}
                          error={!!errors.nationalHealthCard?.message}
                          helperText={errors.nationalHealthCard?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="state"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="UF:" 
                          {...field}
                          error={!!errors.state?.message}
                          helperText={errors.state?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="father"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Pai:" 
                          {...field}
                          error={!!errors.father?.message}
                          helperText={errors.father?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="mother"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Mae:" 
                          {...field}
                          error={!!errors.mother?.message}
                          helperText={errors.mother?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="phone"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Telefone:" 
                          {...field}
                          error={!!errors.phone?.message}
                          helperText={errors.phone?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="regionalHealthCard"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Cartão Regional do SUS:" 
                          {...field}
                          error={!!errors.regionalHealthCard?.message}
                          helperText={errors.regionalHealthCard?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="nationalHealthCard"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Cartão Regional do SUS:" 
                          {...field}
                          error={!!errors.nationalHealthCard?.message}
                          helperText={errors.nationalHealthCard?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="address"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Endereço:" 
                          {...field}
                          error={!!errors.address?.message}
                          helperText={errors.address?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="number"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Número:" 
                          {...field}
                          error={!!errors.number?.message}
                          helperText={errors.number?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="neighborhood"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Bairro:" 
                          {...field}
                          error={!!errors.neighborhood?.message}
                          helperText={errors.neighborhood?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="city"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="Cidade:" 
                          {...field}
                          error={!!errors.city?.message}
                          helperText={errors.city?.message}
                        />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="zipCode"
                        render={({field}) => 
                          <TextField
                          fullWidth
                          label="CEP:" 
                          {...field}
                          error={!!errors.zipCode?.message}
                          helperText={errors.zipCode?.message}
                        />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" marginTop="1rem">
                    <Button type="submit" variant="contained">
                      Cadastrar
                    </Button>
                  </Box>
                </form>
              </Content>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
