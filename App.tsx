import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";
import {NewTaskForm} from "./NewTaskForm";
import {TaskComponent} from "./TaskComponent";



export const App: React.FunctionComponent<{
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
    store.evtTaskDeleted.attach(ctx, ()=>
      forceUpdate()
    )
  },[store]);



  return(
    <div>
      
      <NewTaskForm newTask={store.addTask}/>
      
      <ul>
        {store.tasks.map(task => 
        <TaskComponent key={task.id} 
          store={store}
          task={task}
        />).reverse()}
      </ul>
    </div>

  )
}