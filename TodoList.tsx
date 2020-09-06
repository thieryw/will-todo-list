import React, { useState } from 'react';

import {store} from './logic';

type InputProps = {
  addElementToList: (todo: string)=>void;
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

  const [storeElements, setStoreState] = useState({store});



  const addElementToList = (todo: string)=>{
    
    store.addElement(todo); 
    
    setStoreState({store});
      
  }

  const deleteElement = (id: number)=>{
    store.removeElement(id);

    setStoreState({store});    
  }

  
  

  return(

    <div>
      <Input addElementToList={addElementToList}/>

      
      <ul>
      
        {
          storeElements.store.todoElements.map((elem, index) => 
            <li 
              key={index}>{elem.element} 
              <p onClick={()=> deleteElement(elem.id)}>X</p>
            </li>
          )
        }
      
      </ul>
      
    </div>
  )
}













