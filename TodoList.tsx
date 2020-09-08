import React, { useState } from 'react';

import {evtStore, Store} from './logic';


type InputProps = {
  addElement: (todoElement: string)=>void;
  loadingIndicator: JSX.Element;
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
      {InputProps.loadingIndicator}
    </form>
    
  )
}

type TodoListProps = {
  store: Store;
}

const TodoList: React.FunctionComponent<TodoListProps> = (TodoListProps)=>{
  
  const store = TodoListProps.store;
  const [storeState, setStore] = useState({store});
  const [inputLoading, setInputLoading] = useState(<p></p>);
  const [elementLoadingId, setElementLoadingId] = useState(null);


  const addElement = (todo: string)=>{    
    store.addElement(todo);
    setInputLoading(<p>Loading...</p>);

    store.evtUpdateStore.attach(
      ()=>{
        setStore({store});
        setInputLoading(<p></p>);
      }
    )
  }

  const deleteElement = (id: number)=>{
    setElementLoadingId(id);
    store.removeElement(id);
    store.evtUpdateStore.attach(
      ()=>{
        setStore({store});
        setElementLoadingId(null);
        
      }
    )
  }

  const markOrUnMarkAsComplete = (id: number)=>{
    setElementLoadingId(id);
    store.markOrUnMarkAsCompleted(id);
    store.evtUpdateStore.attach(
      ()=>{
        setStore({store});
        setElementLoadingId(null);
      }
    )
  }

  return(
    <div>
      <Input addElement={addElement} loadingIndicator={inputLoading}/>
      <ul>
      {
        storeState.store.todoElements.map(
          (elem, index) =>
          <li key={index} className={elem.isComplete && elementLoadingId !== elem.id ? "complete" : ""}>
            <input 
              checked={elem.isComplete} 
              type="checkbox"
              onChange={()=> markOrUnMarkAsComplete(elem.id)}
            />
            {elementLoadingId === elem.id ? "Loading..." : elem.element}
            <p onClick={()=> deleteElement(elem.id)}>X</p>
          </li>
        ).reverse()
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








