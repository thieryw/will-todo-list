import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";




export const NewTaskForm: React.FunctionComponent<{
  newTask: Store["addTask"];
}> = props =>{

  const { newTask: addTask }= props;

  const [textInput, setTextInput] = useState("");
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
   
      if(textInput === ""){
        
        return;
      }

      if(isTaskLoading && textInput !==""){
        setTextInput("");
        return;
      }

      setIsTaskLoading(true);

      addTask(textInput).then(()=>{
        setIsTaskLoading(false);
      });
   
      setTextInput("");

    }, 
    [ addTask, textInput ]
  );

  

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={textInput} 
        onChange={useCallback(({target})=> setTextInput(target.value),[])}
      />
      <input type="submit"/>
      <p>{isTaskLoading ? "Loading..." : ""}</p>
    
    </form>
  )
}