import {ClientForm} from "../components/ClientForm";
import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillEdit} from "react-icons/ai";
import { MdOutlineEditCalendar } from "react-icons/md"
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import {ClientTable} from "../components/ClientTable";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function Dashboard({clients}) {
    const bg = useColorModeValue("white", "gray.800");
    const bg2 = useColorModeValue("white", "gray.800");
    const bg3 = useColorModeValue("gray.100", "gray.700");
  
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };
  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={() => getProfile()}>profile</button>
      <button onClick={() => logout()}>Logout</button>
      <ClientForm/>
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: bg }}
        shadow="lg"
      >
        {clients.map((client) => {
          return (
            <Flex direction={{ base: "row", md: "column" }} bg={bg2} key={client.id_cliente}>
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 5 }}
                w={{ base: 140, md: "full" }}
                textTransform="uppercase"
                bg={bg3}
                color={"gray.600"}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="xs"
                fontWeight="bold"
              >
                <span>Nombre</span>
                <span>Dirección</span>
                <span>ip</span>
                <span>Abonos</span>
                <chakra.span textAlign={{ md: "right" }}>Datos cliente</chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 5 }}
                w="full"
                py={2}
                px={10}
                fontWeight="semibold"
              >
                <span>{client.fullname}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {client.address}
                </chakra.span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {client.ip}
                </chakra.span>
                <Flex>
                  <Button
                    size="sm"
                    variant="solid"
                    leftIcon={<Icon as={MdOutlineEditCalendar} />}
                    colorScheme="purple"
                  >
                    Ver/editar
                  </Button>
                </Flex>
                <Flex justify={{ md: "end" }}>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="green"
                      icon={<AiFillEdit />}
                      aria-label="Edit"
                    />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                      aria-label="Delete"
                    />
                  </ButtonGroup>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
    </div>
    
  );
}


export const getServerSideProps = async (context) => {

    const { data: clients } = await axios.get('http://localhost:3000/api/clients');
  
    return {
      props: {
        clients,
      },
    };
  };

export default Dashboard;

