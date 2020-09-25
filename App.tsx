import React, {useState, useCallback, useEffect, useReducer} from "react";


import {Store, getStore} from "./logic";





const TaskForm: React.FunctionComponent<
  {
    addNewTask: Store["addNewTask"];
  }
> = (props)=>{
  
  const [textInput, setTextInput] = useState("");

  const handleSubmit = useCallback( async (e: React.FormEvent<HTMLFormElement>)=>{
    
    e.preventDefault();

    await props.addNewTask(textInput);

    setTextInput("");
    
    
    
  },[textInput]);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    setTextInput(e.target.value);
  
  },[textInput])
  
  
  return(
    
      <form onSubmit={handleSubmit}>
        <input value={textInput} onChange={handleChange} type="text" />
        <input type="submit" />
      </form>

    
  )
}

export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  const {store} = props;

  
  
  return(
    <div>
      <TaskForm addNewTask={store.addNewTask}/>
    </div>

  )
}




















