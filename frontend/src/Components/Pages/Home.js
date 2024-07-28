import React,{useEffect} from 'react';
import { Container,Box,Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

import '../../../src/index.css'
const Home = () => {
  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
// console.log(userInfo)
  
  const {user}=useGlobalContext();
  const navigate=useNavigate();
  // console.log(user);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/transaction");
  //   }
  // }, [userInfo, navigate]);
  if(userInfo){
    // console.log("Hoeee")
    navigate("/transaction")
    
  }

  return (
  

    <Container d="flex" pt={50}  maxW="xl"   >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
       width="100%"
        m="50px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
          <Text textAlign="center" fontSize="3xl" fontFamily="Cursive" color={'#6913bf'} fontWeight={"700"}>ExpenseEase</Text>
       
      </Box>
      <Box p={3} bg="white" width="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
    
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
       
  
    </Container>
  
  );
 }

export default Home;
