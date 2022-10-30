import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import api from "../services/api";

import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";

const DestinationForm = () => {
  const [newUser, setNewUser] = useState();

  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const [selectCountry, setSelectCountry] = useState();
  const [selectCity, setSelectCity] = useState();

  const schema = yup.object().shape({
    username: yup.string().required("Este campo é obrigatório"),
    email: yup.string().required("Este campo é obrigatório"),
    tel: yup.string().required("Este campo é obrigatório"),
    cpf: yup.string().required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    setNewUser({
      username: data.username,
      email: data.email,
      tel: data.tel,
      cpf: data.cpf,
      country: selectCountry,
      city: selectCity,
    });
  };
  console.log(newUser);

  useEffect(() => {
    const getCountryData = async () => {
      const getCountryName = [];
      const reqData = await fetch("https://amazon-api.sellead.com/country");
      const resData = await reqData.json();

      for (let i = 0; i < resData.length; i++) {
        getCountryName.push(resData[i].name_ptbr);
      }
      setCountry(getCountryName);
    };

    const getCityData = async () => {
      const getCityName = [];
      const reqData = await fetch("https://amazon-api.sellead.com/city");
      const resData = await reqData.json();

      const filterCity = resData.slice(0, 890);
      for (let i = 0; i < filterCity.length; i++) {
        let cityName = filterCity[i].name_ptbr;
        if (cityName !== "" || cityName !== undefined || cityName !== null) {
          getCityName.push(cityName);
        } else {
          console.log("Nome da cidade é nulo");
        }
      }
      setCity(getCityName);
    };

    getCountryData();
    getCityData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitFunction)}>
      <Flex flexDir="column" w="70%" m="0 auto">
        <Flex justifyContent="center" bg="white" borderRadius="10px" p="30px">
          <Box border="1px solid #404040" p="15px 30px" borderRadius="10px">
            <Text textAlign="center">Dados Pessoais</Text>

            <FormControl isRequired>
              <FormLabel htmlFor="username">Nome</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Insira aqui seu nome completo"
                {...register("username")}
              />
              {errors.username && (
                <FormHelperText>{errors.username.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Insira aqui seu melhor email"
                {...register("email")}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="tel">Telefone</FormLabel>
              <Input
                id="tel"
                type="number"
                placeholder="(XX) XXXXX-XXXX"
                {...register("tel")}
              />
              {errors.tel && (
                <FormHelperText>{errors.tel.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <Input
                id="cpf"
                type="number"
                placeholder="XXX.XXX.XXX-XX"
                {...register("cpf")}
              />
              {errors.cpf && (
                <FormHelperText>{errors.cpf.message}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box border="1px solid #404040" p="15px 30px" borderRadius="10px">
            <Text textAlign="center">Destinos de interesse</Text>

            <FormControl isRequired>
              <FormLabel htmlFor="selectCountry">Países</FormLabel>
              <Multiselect
                isObject={false}
                options={country}
                showCheckbox
                placeholder="Selecione os países de interesse"
                avoidHighlightFirstOption
                onSelect={(e) => setSelectCountry(e)}
              />
            </FormControl>

            <FormControl isRequired mt="70px">
              <FormLabel htmlFor="selectCity">Cidades</FormLabel>
              <Multiselect
                isObject={false}
                options={city}
                showCheckbox
                placeholder="Selecione as cidades de interesse"
                avoidHighlightFirstOption
                onSelect={(e) => setSelectCity(e)}
              />
            </FormControl>
          </Box>
        </Flex>
        <Button type="submit">Enviar</Button>
      </Flex>
    </form>
  );
};

export default DestinationForm;
