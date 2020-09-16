import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store, Task} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";
import {Spinner} from "./Spinner";


export const TaskComponent: React.FunctionComponent<{
  task: Task;
  store: Pick<
    Store,
    "changeTask" |
    "toggleTask"|
    "evtTaskUpdated" |
    "deleteTask"
  >

}> = props=>{

  const {task, store} = props;
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isEventPending, setIsEventPending] = useState(false);
  const [, forceUpdate] = useReducer(x=> x+1, 0);

  const handleTaskClick = useCallback(()=>{
    if(isTaskClicked){
      return;
    }
    setIsTaskClicked(true);
    

  },[isTaskClicked]);

  const submitNewTask = useCallback((e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(newTask ===""){
      return;
    }

    store.changeTask(task.id, newTask);

    setNewTask("");   
    setIsTaskClicked(false);
    


  },[newTask]);
 
  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>
    setNewTask(e.target.value)
    ,[])

  useEvt(ctx=>{

    store.evtTaskUpdated.attach(ctx, ()=>
      forceUpdate()    
    )

  },[task, store]);


  const determineIfEventPending = useCallback(async ()=>{
    
    setIsEventPending(true);
    
    await store.toggleTask(task.id);

    setIsEventPending(false);
    
    

  },[isEventPending]);

  return (
    <li>
      {
        !isEventPending ?
        <input 
          type="checkbox" 
          checked={task.isComplete} 
          onClick={determineIfEventPending}
          onChange={determineIfEventPending}
        /> : 
        <Spinner/>

      }
    {
      
        !isTaskClicked ? 
          <p onClick={handleTaskClick} className={task.isComplete ? "complete" : ""}>{task.description}</p>
          :
        <form className="taskForm" onSubmit={submitNewTask}>
          <input 
            type="text" 
            value={newTask} 
            onChange={handleChange}
          />
        </form>
        
      
    }
    <p className="deleteButton" onClick={useCallback(()=> store.deleteTask(task.id),[])}>X</p>
    </li>
  )
}