import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";




const TaskInput: React.FunctionComponent<{
  newTask: (task: string)=> void;
}> = props =>{

  const { newTask: addTask }= props;

  const [textInput, setTextInput] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
   
      if(textInput === ""){
        
        return;
      }

      addTask(textInput);
   
      setTextInput("");

    }, 
    [ addTask, textInput ]
  );

  

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={textInput} 
        onChange={useCallback(({target})=> setTextInput(target.value),[])}
      />
      <input type="submit"/>
    
    </form>
  )
}



const Task: React.FunctionComponent<{
  task: string; 
  id: number; 
  isComplete: boolean;
  toggleTask: (id: number)=> void;
  deleteTask: (id: number)=> void;
}> = props=>{

  const {task, id, isComplete, toggleTask, deleteTask} = props;

  return (
    <li>
    <input type="checkbox" checked={isComplete} onChange={useCallback(()=> toggleTask(id),[])}/>
    <p className={isComplete ? "complete" : ""}>{task}</p>
    <p className="deleteButton" onClick={useCallback(()=> deleteTask(id),[])}>X</p>
    </li>
  )
}


export const TodoList: React.FunctionComponent<{
    store: Store;
}> = props=>{

  const { store } = props;

  const [,forceUpdate]= useReducer(x=>x+1, 0);

  


  useEvt(
    ctx=> {
        
      store.evtTaskAdded.attach(
        ctx, 
        () => forceUpdate()
      );

    },
    [store]
  );

  useEvt(ctx=>{
    store.evtToggleTask.attach(ctx, ()=>
      forceUpdate()
    )
    
  },[store]);

  useEvt(ctx=>{
    store.evtTaskDeleted.attach(ctx, ()=>
      forceUpdate()
    )
  },[store]);

  return(
    <div>
      
      <TaskInput newTask={store.addTask}/>
      
      <ul>
        {store.tasks.map(task => 
        <Task key={task.id} 
        task={task.description} 
        id={task.id}  
        isComplete={task.isComplete}
        toggleTask={store.toogleTask}
        deleteTask={store.deleteTask}
        />)}
      </ul>
    </div>

  )
}