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
  Select,
  Text,
} from "@chakra-ui/react";
import api from "../services/api";

const DestinationForm = () => {
  const [newUser, setNewUser] = useState({});

  const [country, setCountry] = useState();
  const [city, setCity] = useState();

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
    setNewUser(data);
  };

  api
    .get("/country")
    .then((response) => {
      setCountry(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

  api
    .get("/city")
    .then((response) => {
      setCity(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

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
              <FormLabel htmlFor="selectCountry">Nome</FormLabel>
              <Select>
                {country &&
                  country.map((countryName, index) => (
                    <option key={index}>{countryName.name_ptbr}</option>
                  ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="selectCity">Nome</FormLabel>
              <Select>
                {city &&
                  city.map((cityName, index) => (
                    <option key={index}>{cityName.name_ptbr}</option>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Flex>
        <Button type="submit">Enviar</Button>
      </Flex>
    </form>
  );
};

export default DestinationForm;
