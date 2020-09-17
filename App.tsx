import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";
import {NewTaskForm} from "./NewTaskForm";
import {Task} from "./Task";



export const App: React.FunctionComponent<{
    store: Store;
}> = props=>{

  const { store } = props;

  const [,forceUpdate]= useReducer(x=>x+1, 0);

  



  useEvt(ctx => {
    Evt.merge(ctx, [store.evtTaskAdded, store.evtTaskDeleted]).attach(()=>
      forceUpdate()
    )

  },[store])



  return(
    <div>
      
      <NewTaskForm newTask={store.addTask}/>
      
      <ul>
        {store.tasks.map(task => 
        <Task key={task.id} 
          store={store}
          task={task}
        />).reverse()}
      </ul>
    </div>

  )
}