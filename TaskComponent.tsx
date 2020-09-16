import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store, Task} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";


export const TaskComponent: React.FunctionComponent<{
  task: Task;
  store: Pick<
    Store,
    "changeTask" |
    "toggleTask"|
    "evtTaskUpdated"
  >

}> = props=>{

  const {task, store} = props;
  //const {task, id, isComplete, toggleTask, deleteTask, changeTask} = props;
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [newTask, setNewTask] = useState("");

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

  return (
    <li>
    <input 
      type="checkbox" 
      checked={task.isComplete} 
      onChange={useCallback(()=> store.toggleTask(task.id),[])}
    />
    {
      
        !isTaskClicked ? 
          <p onClick={handleTaskClick} className={isComplete ? "complete" : ""}>{task}</p>
          :
        <form className="taskForm" onSubmit={submitNewTask}>
          <input 
            type="text" 
            value={newTask} 
            onChange={handleChange}
          />
        </form>
        
      
    }
    <p className="deleteButton" onClick={useCallback(()=> deleteTask(id),[])}>X</p>
    </li>
  )
}