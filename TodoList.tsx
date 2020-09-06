import React, { useState } from 'react';

import {storePr, Store} from './logic';

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
      <input type="submit" value="submit" />
      
      
    </form>

  )
}






type AppProps = {
  store: Store;
}

export const App: React.FunctionComponent<AppProps> = (AppProps)=>{

  const [storeElements, setStoreState] = useState(AppProps.store);
  
  


  const addElementToList = (todo: string)=>{
    
    AppProps.store.addElement(todo);     
    setStoreState(AppProps.store);      
  }

  const deleteElement = (id: number)=>{
    
    AppProps.store.removeElement(id);
    setStoreState(AppProps.store);    
  }

  const markOrUnmarkTaskAsComplete = (id: number)=>{
    
    AppProps.store.markOrUnMarkAsCompleted(id);
    setStoreState(AppProps.store);
  }

  
  

  return(

    <div>
      <Input addElementToList={addElementToList}/>

      
      <ul>
      
        {

          storeElements.todoElements.map((elem, index) => 
            <li className={elem.isComplete ? "complete" : ""} key={index}>
              <input checked={elem.isComplete as boolean} 
                type="checkbox" 
                onClick={()=>markOrUnmarkTaskAsComplete(elem.id)}
              />
              {elem.element} 
              <p onClick={()=> deleteElement(elem.id)}>X</p>
            </li>
          )
        }
      
      </ul>
      
    </div>
  )
}

const SplashScreen: React.FunctionComponent = ()=>{
  
  return(
    {
      storePr

    }
  )
}











