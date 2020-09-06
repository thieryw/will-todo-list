import React, { useState } from 'react';

import {storePr, Store} from './logic';





const Input: React.FunctionComponent = ()=>{
  const [text, setText] = useState("");
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setText("");
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange}/>
      <input type="submit" value="submit"/>
    </form>
  )
}

export const SplashScreen: React.FunctionComponent = ()=>{
  
  

  
  
  return(
    <div>
      <Input/>
    </div>
    
  )
}








