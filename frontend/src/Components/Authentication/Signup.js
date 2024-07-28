import { Box, InputGroup, InputRightElement, Stack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios';
import {
  FormControl,
  FormLabel,Input,Button,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

const Signup = () => {
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmpassword,setConfirmPassword]=useState("");
  const[gender,setGender]=useState("");
  
  const[show1,setShow1]=useState(false);
  const[show2,setShow2]=useState(false);
  const {setUser}=useGlobalContext();
  

  const toast = useToast();
  const handleGenderChange = (value) => {
    setGender(value);
  };
  function handleClick1()
  {
    setShow1(!show1);
  }
  function handleClick2()
  {
    setShow2(!show2);
  }
  async function handleSubmit()
  {
    
    try{
    const response=await axios.post(`https://expenseease-70qj.onrender.com${/api/v1/user/signup}`,{name,email,password,confirmpassword,gender},{
      headers: {
          'Content-Type': 'application/json' // Set the content type
        }
      });
      
    if(response.data.message){
      toast({
        title: "Error Occured!",
        description: response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

  }
  else{
    
    toast({
      title: "Signup Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setUser(response.data)
  
    localStorage.setItem("userInfo",JSON.stringify(response.data));

    

    
    navigate("/transaction")
    
      }
  
  }
  catch(error){
    console.log("error in signup frontend ",error);
   
  }

  }


  

  return (
    <div>
     <VStack spacing="7px">
     
      <FormControl isRequired>
  <FormLabel>Name</FormLabel>
  <Input type='text' placeholder='Enter Name ' onChange={(e)=>setName(e.target.value)}/>
  </FormControl>
  <FormControl isRequired>
  <FormLabel>Email</FormLabel >
  <Input type='email' placeholder='Enter Email ' onChange={(e)=>setEmail(e.target.value)}  />
  </FormControl>
  <FormControl isRequired>
  <FormLabel>Password</FormLabel>
  <InputGroup>
  <Input type={show1?"text":"password"} placeholder='Enter Password '  onChange={(e)=>setPassword(e.target.value)} />
  <InputRightElement>
  <Button onClick={handleClick1}  size="sm">{show1?"Hide":"Show"}</Button>
  </InputRightElement>
  </InputGroup>
  </FormControl>
  <FormControl isRequired>
  <FormLabel>Confirm Password</FormLabel>
  <InputGroup>
  <Input type={show2?"text":"password"} placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
  <InputRightElement>
  <Button onClick={handleClick2}  size="sm">{show2?"Hide":"Show"}</Button>
  </InputRightElement>
  </InputGroup>
  </FormControl>
  
  {/* <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}
       <FormControl isRequired>
        <FormLabel>Select Gender</FormLabel>
      <RadioGroup onChange={setGender} value={gender}>
          <Stack direction="row">
          
            <Radio value="boy">Male</Radio>
            <Radio value="girl">Female</Radio>
           
          </Stack>
        </RadioGroup>
        </FormControl>
  <Button onClick={handleSubmit}  width="100%" colorScheme='blue'marginTop="12px">Signup</Button>

      </VStack>
      {/* //<ToastContainer /> */}
      
    </div>
  )
}

export default Signup;
