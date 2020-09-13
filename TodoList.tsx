import React, {useState} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";


export const SplashScreen: React.FunctionComponent = ()=>{


  return(
    <h1>Loading...</h1>
  )
}

type InputProps = {
  newTask: (task: string)=> void;
}

const TaskInput: React.FunctionComponent<InputProps> = (props)=>{

  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    props.newTask(newTask);
    setNewTask("");

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNewTask(e.target.value);
    

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={handleChange}/>
      <input type="submit"/>
    
    </form>
  )
}

type TodoListProps = {
  store: Store;
}

export const TodoList: React.FunctionComponent<TodoListProps> = (props)=>{
  
    const [tasksObj, setTasksObj] = useState({tasks: props.store.tasks});
    const ctx = Evt.newCtx();

    const newTask = (task: string)=>{
      
      props.store.addTask(task);
      
      props.store.evtTaskAdded.attach(ctx, ()=>{
        
        setTasksObj({"tasks": props.store.tasks});
        
        ctx.done();
      
      });

    }


  

  return(
    <div>
      <TaskInput newTask={newTask}/>
      <ul>
        {
          tasksObj.tasks.map(task => <li>{task.description}</li>)
        }
      </ul>
    </div>

  )
}