import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import DestinationForm from "../../components/DestinationForm";

const FormPage = () => {
  const history = useHistory();

  return (
    <Box bg="#D9D9D9" h="100vh">
      <Box>
        <Button onClick={() => history.push("/")}>Voltar</Button>
      </Box>
      <DestinationForm />
    </Box>
  );
};

export default FormPage;
