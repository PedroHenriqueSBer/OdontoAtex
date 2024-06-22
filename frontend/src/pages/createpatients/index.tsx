import { Grid, TextField, Typography, Box, Button, Autocomplete } from "@mui/material";
import { Container, Content } from "./style";
import { NavHeader } from "../../components";
import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import { ICreatePatientInputModel } from "inputModels";
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logController, patientController } from "../../controllers";
import { useLoading } from "../../context";
import { TypeLog } from "../../types/enum";
import { consultCep } from "../../service";
import { toPattern } from "vanilla-masker";
import { MASK_CEP, MASK_CPF, MASK_PHONE, MASK_PHONE_SIMPLE, MASK_PHONE_SIMPLE_WITH_NINE, MASK_PHONE_WITH_NINE, STATES } from "../../constants";


export const CreatePatients = () => {
  const { setIsLoading } = useLoading()
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
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const {
    zipCode
  } = watch()

  const isValidCEP = (cep: string): boolean => {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  }

  useEffect(() => {
    if (isValidCEP(zipCode)) {
      consultCep(zipCode).then(response => {
        setValue('city', response.city)
        setValue('neighborhood', response.neighborhood)
        setValue('address', response.street)
        setValue('state', response.uf)
        console.log(response.uf)
      })
    }
  }, [zipCode])


  console.log(errors)

  const onSubmit = (input: ICreatePatientInputModel) => {
    setIsLoading(true)
    patientController.create(input).then((response) => {
      logController.insert({
        message: `Paciente ${response.name} criado`,
        title: `Paciente ${response.name} foi criado no dia ${new Date(Date.now()).getDate()}`,
        type: TypeLog.SUCCESS
      }).then(() => { })
    }).finally(() => setIsLoading(false))
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
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        render={({ field: { value, ...field } }) =>
                          <TextField
                            fullWidth
                            label="CPF:"
                            {...field}
                            error={!!errors.cpf?.message}
                            helperText={errors.cpf?.message}
                            value={toPattern(value, MASK_CPF)}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="rg"
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        render={({ field:{value,...field}}) =>
                          <Autocomplete
                          value={value}
                            fullWidth
                            options={STATES}
                            renderInput={(params) =>
                              <TextField
                                label="Uf"
                                error={!!errors.state?.message}
                                helperText={errors.state?.message}
                                {...field}
                                {...params}
                              />
                            }
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="father"
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        render={({ field: { value, ...field } }) =>
                          <TextField
                            fullWidth
                            label="Telefone:"
                            {...field}
                            error={!!errors.phone?.message}
                            helperText={errors.phone?.message}
                            value={toPattern(value,
                              value.length < 9
                                ? MASK_PHONE_SIMPLE
                                : value.length < 10
                                  ? MASK_PHONE_SIMPLE_WITH_NINE
                                  : value.length < 14
                                    ? MASK_PHONE
                                    : MASK_PHONE_WITH_NINE
                            )}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="regionalHealthCard"
                        render={({ field }) =>
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
                        render={({ field }) =>
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
                        name="zipCode"
                        render={({ field: { value, ...field } }) =>
                          <TextField
                            fullWidth
                            label="CEP:"
                            {...field}
                            error={!!errors.zipCode?.message}
                            helperText={errors.zipCode?.message}
                            value={toPattern(value, MASK_CEP)}
                          />
                        }
                      />
                    </Grid>
                    {
                      isValidCEP(zipCode) &&
                      <>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            control={control}
                            name="address"
                            render={({ field }) =>
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
                            render={({ field }) =>
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
                            render={({ field }) =>
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
                            render={({ field }) =>
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
                      </>
                    }
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
