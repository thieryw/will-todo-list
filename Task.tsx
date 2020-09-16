import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";


export const Task: React.FunctionComponent<{
  task: string; 
  id: number; 
  isComplete: boolean;
  toggleTask: (id: number)=> void;
  deleteTask: (id: number)=> void;
  changeTask: (id: number, newTask: string)=> void;
}> = props=>{

  const {task, id, isComplete, toggleTask, deleteTask, changeTask} = props;
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

    changeTask(id, newTask);

    setNewTask("");   
    setIsTaskClicked(false);
    


  },[newTask]);
 
  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>
    setNewTask(e.target.value)
    ,[])

  return (
    <li>
    <input type="checkbox" checked={isComplete} onChange={useCallback(()=> toggleTask(id),[])}/>
    {
      (()=>{
        if(!isTaskClicked){
          return <p onClick={handleTaskClick} className={isComplete ? "complete" : ""}>{task}</p>;

        }

        return <form className="taskForm" onSubmit={submitNewTask}>
        <input 
          type="text" 
          value={newTask} 
          onChange={handleChange}/>

        </form>;
        
      })()
    }
    <p className="deleteButton" onClick={useCallback(()=> deleteTask(id),[])}>X</p>
    </li>
  )
}