import React, { useState } from 'react';

import {evtStore, Store} from './logic';


type InputProps = {
  addElement: (todoElement: string)=>void;
}


const Input: React.FunctionComponent<InputProps> = (InputProps)=>{
  const [text, setText] = useState("");
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    InputProps.addElement(text);
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

type TodoListProps = {
  store: Store;
}

const TodoList: React.FunctionComponent<TodoListProps> = (TodoListProps)=>{
  
  const store = TodoListProps.store;
  const [storeState, setStore] = useState({store});

  const addElement = (todo: string)=>{
    store.addElement(todo);
    setStore({store});
  }

  const deleteElement = (id: number)=>{
    store.removeElement(id);
    setStore({store});
  }

  const markOrUnMarkAsComplete = (id: number)=>{
    store.markOrUnMarkAsCompleted(id);
    setStore({store});
  }

  return(
    <div>
      <Input addElement={addElement}/>
      <ul>
      {
        storeState.store.todoElements.map(
          (elem, index) =>
          <li key={index} className={elem.isComplete ? "complete" : ""}>
            <input 
              checked={elem.isComplete} 
              type="checkbox"
              onChange={()=> markOrUnMarkAsComplete(elem.id)}
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

export const SplashScreen: React.FunctionComponent = ()=>{
  
  const [screen, setScreen] = useState(<h1>Loading</h1>)

  evtStore.attach(
    store =>{
      setScreen(<TodoList store={store}/>);
    }
  )
  
  
  
  return(
    <div>
      {screen}
    </div>
    
  )
}








