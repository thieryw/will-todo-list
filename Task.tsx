import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";
import {Spinner} from "./Spinner";



export const Task: React.FunctionComponent<{
  task: Store["tasks"][number];
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
  const [isTaskToggling, setIsTaskToggling] = useState(false);
  const [, forceUpdate] = useReducer(x=> x+1, 0);

  const handleTaskClick = useCallback(()=>{
    if(isTaskClicked){
      return;
    }
    setIsTaskClicked(true);
    

  },[isTaskClicked]);

  const submitNewTask = useCallback((e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(newTask ==="" || isTaskToggling && newTask !== ""){
      setNewTask("");
      return;
    }

    setIsTaskToggling(true);
   

    store.changeTask(task.id, newTask).then(()=>{
      setIsTaskToggling(false)
    });

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


  const toggleTaskProxy = useCallback(async ()=>{
    
    setIsTaskToggling(true);
    
    await store.toggleTask(task.id);

    setIsTaskToggling(false);
    
    

  },[isTaskToggling]);

  const deleteTaskProxy = useCallback(()=>{
    if(isTaskToggling){
      return;
    }

    setIsTaskToggling(true);

    store.deleteTask(task.id).then(()=>{
      setIsTaskToggling(false);
    })
  },[isTaskToggling]);

  return (
    <li>
      {
        !isTaskToggling ?
        <input 
          type="checkbox" 
          checked={task.isComplete} 
          onChange={toggleTaskProxy}
        /> : 
        <Spinner/>

      }
    {
      
        !isTaskClicked ? 
          <p onClick={handleTaskClick} className={task.isComplete ? "complete" : ""}>{
             isTaskToggling ? "" : task.description
            }
          </p>
          :
        <form className="taskForm" onSubmit={submitNewTask}>
          <input 
            type="text" 
            value={newTask} 
            onChange={handleChange}
            autoFocus={true}
            
          />
        </form>
        
      
    }
    <p className="deleteButton" onClick={deleteTaskProxy}>X</p>
    </li>
  )
}