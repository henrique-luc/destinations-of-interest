import { Button, Center, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <Center flexDir="column" h="100vh" bgColor="#D9D9D9">
      <Heading fontFamily="'Cinzel', serif;" fontSize="9xl">
        DESTINY
      </Heading>
      <Button onClick={() => history.push("/form-page")}>Entrar</Button>
    </Center>
  );
};

export default Home;
