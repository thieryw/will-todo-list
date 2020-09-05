import React, { useState } from 'react';

import {store} from './logic';

type InputProps = {
  addElementToList: (value: string)=>void;
}


const Input: React.FunctionComponent<InputProps> = (InputProps)=>{

  const [todo, setTodo] = useState("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    InputProps.addElementToList(todo);
    setTodo("");

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    setTodo(e.target.value);
   
  }

  return (
    <form onSubmit={handleSubmit}>

      <input type="text" onChange={handleChange} value={todo}/>
      
      
    </form>

  )
}








export const App: React.FunctionComponent = ()=>{

  const [storeElements, setStoreState] = useState([""])



  const addElementToList = (todoElement: string)=>{
    
    store.addElement(todoElement);
    let elements = [""];
    store.todoElements.map(curr => elements.push(curr.element));
    setStoreState(elements);

  
  }

  
  

  return(

    <div>
      <Input addElementToList={addElementToList}/>

      
      <ul>
      
        {storeElements.map(elem => <li>{elem}</li>)}
      
      </ul>
      
    </div>
  )
}













