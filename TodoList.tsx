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

    useEvt(ctx =>{
      props.store.evtTaskAdded.attach(ctx, tasks=>{
        setTasksObj({tasks});
        
      })
    },[]);


  

  return(
    <div>
      <TaskInput newTask={props.store.addTask}/>
      <ul>
        {
          tasksObj.tasks.map(task => <li key={task.id}>{task.description}</li>).reverse()
        }
      </ul>
    </div>

  )
}