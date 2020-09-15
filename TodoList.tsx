import React, {useState, useCallback, useReducer} from "react";
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    
    setTextInput(e.target.value);
    console.log(textInput);
  }, [textInput]);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={textInput} 
        onChange={handleChange}
      />
      <input type="submit"/>
    
    </form>
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

  return(
    <div>
      <TaskInput newTask={store.addTask}/>
      <ul>
        {store.tasks.map(task => <li key={task.id}>{task.description}</li>).reverse()}
      </ul>
    </div>

  )
}