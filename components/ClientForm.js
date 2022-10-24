import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  
import axios from 'axios';


  export function ClientForm(){

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/clients', {
            fullname: 'cliente1',
            address: 'domicilio',
            ip: '192.168.0.1',
            tel: '9999999',
            email: 'example@example.com'
        })
        console.log(res)
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Crear un cliente
          </Heading>
          <FormControl id="createClient">
          <FormLabel>Nombre completo</FormLabel>
            <Input
              placeholder="Nombre completo del cliente"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          
              <FormLabel>Domicilio</FormLabel>
            <Input
              placeholder="Domicilio"
              _placeholder={{ color: 'gray.500' }}
              type="address"
            />

            <FormLabel>IP</FormLabel>
            <Input
              placeholder="192.168.0..."
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
              <FormLabel>Teléfono</FormLabel>
            <Input
              placeholder="115839...."
              _placeholder={{ color: 'gray.500' }}
              type="tel"
            />

               <FormLabel>Email</FormLabel>
            <Input
              placeholder="cliente@cliente.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          
        
          </FormControl>
          
         
          
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Crear
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }