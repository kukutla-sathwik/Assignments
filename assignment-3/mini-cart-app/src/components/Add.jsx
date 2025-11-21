import React from 'react'
import styled from 'styled-components';
import { useState } from 'react'


const Row=styled.div`
display:flex;
flex-direction:row; 
justify-content:space-evenly;

`
function Add() {
 let [count,setCount]=useState(0); 
 function handleClickAdd(){
          setCount(count+1)
 }
 

  
return (
      <Row>
      <h1>hello</h1>
      <h1>{count}</h1>
      <button onClick={handleClickAdd}>+</button>
     
      </Row>
      
    
  )
}

export default Add
