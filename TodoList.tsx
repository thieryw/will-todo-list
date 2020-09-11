import React, { useState } from 'react';

import {evtStore, Store, Task} from './logic';


type InputProps = {
  addElement: (todoElement: string)=>void;
  loadingIndicator: JSX.Element;
}


const Input: React.FunctionComponent<InputProps> = (InputProps)=>{
  const [task, setTask] = useState("");
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(task === ""){
      return;
    }  
    InputProps.addElement(task);
    setTask("");
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setTask(e.target.value);
  }
  
  return(
    <form onSubmit={handleSubmit}> 
      <input type="text" value={task} onChange={handleChange}/>
      <input type="submit" value="submit"/>
      {InputProps.loadingIndicator}
    </form>
    
  )
}

type TaskProps = {
  store: Store;
  taskId: number;
  

}

const Task: React.FunctionComponent<TaskProps> = (TaskProps)=>{
  const store = TaskProps.store;
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [storeState, setStoreState] = useState({store});
  
  const handleCheckbox = ()=>{
    setIsTaskLoading(true);
    store.markOrUnMarkAsCompleted(TaskProps.taskId);
    storeState.store.evtUpdateStore.attach(
      () => {
        setStoreState({store});
        setIsTaskLoading(false);
        
        storeState.store.evtUpdateStore.detach();
        
      }
    );

    

  }
  
  return(

    <li className={storeState.store.tasks[TaskProps.taskId].isComplete ? "complete" : ""}>
      <input type="checkbox" checked={storeState.store.tasks[TaskProps.taskId].isComplete} onChange={handleCheckbox}/>
      <p>{isTaskLoading ? "Loading..." : storeState.store.tasks[TaskProps.taskId].element}</p>
      <p className="deleteButton">X</p>
    
    </li>

  )
}

type TodoListProps = {
  store: Store;
}

const TodoList: React.FunctionComponent<TodoListProps> = (TodoListProps)=>{
  const store = TodoListProps.store;
  const [storeState, setStore] = useState({store});
  const [inputLoading, setInputLoading] = useState(<p></p>);

  const addElement = (todo: string)=>{    
    store.addElement(todo);
    setInputLoading(<p>Loading...</p>);

    store.evtUpdateStore.attach(
      ()=>{
        setStore({store});
        setInputLoading(<p></p>);
        store.evtUpdateStore.detach();
        
      }
    )
  }
  return(
    <div>
      <Input addElement={addElement} loadingIndicator={inputLoading}/>

      <ul>
        {
          TodoListProps.store.tasks.map(
            task=><Task key={task.id} store={TodoListProps.store} taskId={task.id}/>
          ).reverse()
        }
      </ul>
    
    </div>

  );
}

/*const TodoList: React.FunctionComponent<TodoListProps> = (TodoListProps)=>{
  
  const store = TodoListProps.store;
  const [storeState, setStore] = useState({store});
  const [inputLoading, setInputLoading] = useState(<p></p>);
  const [elementLoadingId, setElementLoadingId] = useState(null);
  const [taskClickedId, setTaskClickedId] = useState(null);
  const [newTask, setNewTask] = useState("");


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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNewTask(e.target.value);

  }

  const handleSubmit = (id: number, e: React.FormEvent<HTMLFormElement>) =>{
    
    e.preventDefault();
    
    store.changeElement(id, newTask);
    setElementLoadingId(id);
    setTaskClickedId(null);
    store.evtUpdateStore.attach(
      ()=>{
        setStore({store});
        setElementLoadingId(null);
        setNewTask("");
      }
    )

  }

  return(
    <div>
      <Input addElement={addElement} loadingIndicator={inputLoading}/>
      <ul>
      {
        storeState.store.tasks.map(
          (elem, index) =>
          <li key={index} className={elem.isComplete && elementLoadingId !== elem.id ? "complete" : ""}>
            <input 
              checked={elem.isComplete} 
              type="checkbox"
              onChange={()=> markOrUnMarkAsComplete(elem.id)}
            />
            {
              (()=>{
                if(taskClickedId === null || taskClickedId !== elem.id){
                  return <p onClick={()=> setTaskClickedId(elem.id)}>
                  {elementLoadingId === elem.id ? "Loading..." : elem.element}
                  </p>;
                }

                return <form className="taskForm" onSubmit={(e)=>handleSubmit(elem.id, e)}>
                  <input type="text" onChange={handleChange}/>
                  <input type="submit"/>
                </form>
              })()
            }  
            
            <p className="deleteButton" onClick={()=> deleteElement(elem.id)}>X</p>
          </li>
        ).reverse()
      }
      </ul>
      
    </div>
  )

}*/

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








