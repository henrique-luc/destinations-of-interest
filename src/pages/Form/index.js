import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import DestinationForm from "../../components/DestinationForm";

const FormPage = () => {
  const history = useHistory();

  return (
    <Box bg="#D9D9D9" h="100%" pb="30px">
      <Box p="20px">
        <Button onClick={() => history.push("/")}>Voltar</Button>
      </Box>
      <DestinationForm />
    </Box>
  );
};

export default FormPage;
